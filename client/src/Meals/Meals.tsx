import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { MEAL_LOGGED_SUBSCRIPTION } from './gql/MealLoggedSub';
import { useSearchbarContext } from '../common/AppBar/hook';
import { Loading } from '../common/Loading/Loading';
import { NoResults } from '../common/NoResults.tsx/NoResults';
import { Paginator } from '../common/Pagination/Paginator';
import { useSnackBar } from '../common/SnackBar/hook';
import { SnackType } from '../common/SnackBar/types';
import { _getUserDetails } from '../utils/storeMethods';
import { MealCards } from './MealCards';
import { GET_ALL_MEALS_QUERY } from './gql/GetMealsQuery';

export const Meals: React.FC = () => {
  const { addSnack } = useSnackBar();
  const { id: userId } = _getUserDetails();
  const searchTerm = useSearchbarContext();

  const [req, setReq] = useState({ page: 1, pageLimit: 10, searchTerm });

  const query = useQuery(GET_ALL_MEALS_QUERY, {
    variables: { userId, ...req },
  });

  const { data, loading, error } = query;

  query.subscribeToMore({
    document: MEAL_LOGGED_SUBSCRIPTION,
    variables: { userId, ...req },
    updateQuery: (prev, { subscriptionData }) => {
      return [...prev, subscriptionData.data];
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    addSnack('Error retrieving meals', SnackType.FAILURE);
    return <NoResults noMeals={true} />;
  }

  const { entities, pageDetails } = data?.meals;

  const meals = entities ? entities : [];
  const total = pageDetails?.total ?? 0;
  const { hasBackward, hasForward } = pageDetails;

  const handlePageChange = (forward: boolean) => {
    if (forward && hasForward) {
      setReq({ ...req, page: req.page + 1 });
    } else if (!forward && hasBackward) {
      setReq({ ...req, page: req.page - 1 });
    }
  };

  if (meals && meals.length > 0) {
    return (
      <>
        <MealCards meals={meals} page={req.page} />
        <Paginator
          handlePageChange={handlePageChange}
          pageDetails={pageDetails}
        />
      </>
    );
  }

  return <NoResults noMeals={total === 0} />;
};

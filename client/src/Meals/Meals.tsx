import { useQuery } from '@apollo/client';
import { useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import { useSearchbarContext } from '../common/AppBar/hook';
import { Error } from '../common/Error/Error';
import { Loading } from '../common/Loading/Loading';
import { NoResults } from '../common/NoResults.tsx/NoResults';
import { Paginator } from '../common/Pagination/Paginator';
import { _getUserDetails } from '../utils/storeMethods';
import { MealCards } from './MealCards';
import { GET_ALL_MEALS_QUERY } from './gql/GetMealsQuery';
import { MEAL_LOGGED_SUBSCRIPTION } from './gql/MealLoggedSub';
import { handleSubscribe, safeDestructure } from './utils';

export const Meals: React.FC = () => {
  // ref for scrollToTop
  const ref = useRef<ScrollView>(null);

  // search variables
  const { id: userId } = _getUserDetails();
  const searchTerm = useSearchbarContext();
  const [req, setReq] = useState({ page: 1, pageLimit: 10, searchTerm });

  // query and utils
  const { data, loading, error, subscribeToMore } = useQuery(
    GET_ALL_MEALS_QUERY,
    {
      variables: { userId, ...req },
    },
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  // config for handling new mealLogged subscription
  subscribeToMore({
    document: MEAL_LOGGED_SUBSCRIPTION,
    variables: { userId, ...req },
    updateQuery: handleSubscribe,
  });

  const { meals, pageDetails } = safeDestructure(data);
  const { hasBackward, hasForward, total } = pageDetails;

  const handlePageChange = (forward: boolean) => {
    ref.current?.scrollTo({
      y: 0,
      animated: true,
    });
    
    if (forward && hasForward) {
      setReq({ ...req, page: req.page + 1 });
    } else if (!forward && hasBackward) {
      setReq({ ...req, page: req.page - 1 });
    }
  };

  if (meals && meals.length > 0) {
    return (
      <>
        <MealCards scrollRef={ref} meals={meals} page={req.page} />
        <Paginator
          handlePageChange={handlePageChange}
          pageDetails={pageDetails}
        />
      </>
    );
  }

  return <NoResults noMeals={total === 0} />;
};

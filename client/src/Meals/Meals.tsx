import { useQuery } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSearchbarContext } from '../common/AppBar/hook';
import { ErrorPage } from '../common/Error/Error';
import { Loading } from '../common/Loading/Loading';
import { NoResults } from '../common/NoResults.tsx/NoResults';
import { Paginator } from '../common/Pagination/Paginator';
import { _getUserDetails } from '../utils/storeMethods';
import { MealCard } from './MealCard';
import { GET_ALL_MEALS_QUERY } from './gql/GetMealsQuery';
import { safeDestructure } from './utils';

export const Meals: React.FC = () => {
  const { colors } = useTheme();

  // ref for scrollToTop
  const scrollRef = useRef<FlatList>(null);

  // search variables
  const { id: userId } = _getUserDetails();
  const searchTerm = useSearchbarContext();
  const [req, setReq] = useState({
    userId,
    page: 1,
    pageLimit: 10,
    searchTerm,
  });

  useEffect(() => {
    setReq({ ...req, searchTerm });
  }, [searchTerm]);

  // query and utils
  const { data, loading, error, refetch } = useQuery(GET_ALL_MEALS_QUERY, {
    variables: req,
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.log(JSON.stringify(error));
    return <ErrorPage />;
  }

  const { entities: meals, pageDetails } = safeDestructure(data);
  const { hasBackward, hasForward, total } = pageDetails;

  const handlePageChange = (forward: boolean) => {
    scrollRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });

    if (forward && hasForward) {
      setReq({ ...req, page: req.page + 1 });
    } else if (!forward && hasBackward) {
      setReq({ ...req, page: req.page - 1 });
    }
  };

  return (
    <>
      <FlatList
        ref={scrollRef}
        data={meals}
        renderItem={meal => (
          <MealCard meal={meal.item} page={req.page} idx={meal.index} />
        )}
        keyExtractor={item => String(item.id)}
        refreshControl={
          <RefreshControl
            colors={[colors.background]}
            tintColor={colors.primary}
            progressBackgroundColor={colors.primary}
            refreshing={loading}
            onRefresh={() => refetch()}
          />
        }
        ListEmptyComponent={<NoResults noMeals={!searchTerm && total === 0} />}
        contentContainerStyle={{
          padding: 5,
          flexGrow: 1,
          backgroundColor: colors.background,
          paddingBottom: !!meals.length ? 85 : 0,
        }}
        keyboardDismissMode="on-drag"
        alwaysBounceVertical={true}
      />
      {!!meals.length && (
        <Paginator
          handlePageChange={handlePageChange}
          pageDetails={pageDetails}
        />
      )}
    </>
  );
};

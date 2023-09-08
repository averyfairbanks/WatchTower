import { ReactNode, createContext, useEffect, useState } from 'react';
import { useTheme } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import { UserMeal } from '../Meal/types';
import { useSearchbarContext } from '../common/AppBar/hook';
import {
  Paginated,
  PaginatedMealsRequest,
} from '../common/Pagination/Paginated';
import { useSnackBar } from '../common/SnackBar/hook';
import { _getUserDetails } from '../utils/storeMethods';
import { BottomBar, LogMealButton, Paginator } from './styled';
import { fetchMeals, handlePageChange } from './utils';

/* Context for useMeals hook */
export const MealContext = createContext({
  entities: [] as UserMeal[],
  pageDetails: {
    hasBackward: false,
    hasForward: false,
    total: 0,
  },
} as Paginated<UserMeal> | null);

export const OffsetContext = createContext(0);

/**
 * Main Component and Props
 */

interface MealLoaderProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

export const MealsProvider: React.FC<MealLoaderProps> = ({
  setIsLoading,
  children,
}) => {
  // need theme for manually setting surface color
  const theme = useTheme();

  // navigate for directing to create new from plus FAB
  const navigate = useNavigate();

  // need snackbar for connection errors
  const { addSnack } = useSnackBar();

  // search term for querying
  const searchTerm = useSearchbarContext();

  // user id is need in the path
  const { id: userId } = _getUserDetails();

  // request state
  const [pagedMealsReq, setPagedMealsReq] = useState<PaginatedMealsRequest>({
    searchTerm,
    offset: 1,
    pageLimit: 10,
  });

  // paginated UserMeal state
  const [pagedMeals, setPagedMeals] = useState<Paginated<UserMeal> | null>(
    null,
  );

  // destructure with defaults
  const { meals, hasBackward, hasForward } = safeDestructure(pagedMeals);

  // update searchTerm in request
  useEffect(() => {
    setPagedMealsReq({ ...pagedMealsReq, searchTerm });
  }, [searchTerm]);

  // fetch meals
  useEffect(() => {
    fetchMeals(
      userId,
      { ...pagedMealsReq, searchTerm },
      setPagedMeals,
      setIsLoading,
      addSnack,
    );
  }, [pagedMealsReq]);

  return (
    <MealContext.Provider value={pagedMeals}>
      <OffsetContext.Provider value={pagedMealsReq.offset}>
        {children}
        {!!meals.length && (
          <>
            <BottomBar
              style={{
                backgroundColor: theme.colors.primary,
              }}>
              {hasBackward && (
                <Paginator
                  disabled={!hasBackward}
                  icon="arrow-left"
                  style={{ left: 10 }}
                  onPress={() =>
                    handlePageChange(false, setIsLoading, setPagedMealsReq)
                  }
                />
              )}
              <LogMealButton
                label=""
                onPress={() => {
                  navigate('/meal/create');
                }}
              />
              {hasForward && (
                <Paginator
                  disabled={!hasForward}
                  icon="arrow-right"
                  style={{ right: 10 }}
                  onPress={() =>
                    handlePageChange(true, setIsLoading, setPagedMealsReq)
                  }
                />
              )}
            </BottomBar>
          </>
        )}
      </OffsetContext.Provider>
    </MealContext.Provider>
  );
};

function safeDestructure(pagedMeals: Paginated<UserMeal> | null) {
  const { entities: meals, pageDetails } = pagedMeals
    ? pagedMeals
    : {
        entities: [],
        pageDetails: { hasForward: false, hasBackward: false, total: 0 },
      };
  const { hasBackward, hasForward } = pageDetails;

  return { meals, hasBackward, hasForward };
}

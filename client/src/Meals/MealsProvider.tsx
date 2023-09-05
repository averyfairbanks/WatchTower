import { ReactNode, createContext, useEffect, useState } from 'react';
import { FAB, Surface, useTheme } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import styled from 'styled-components';
import { UserMeal } from '../Meal/types';
import { useSearchbarContext } from '../common/AppBar/hook';
import {
  Paginated,
  PaginatedMealsRequest,
} from '../common/Pagination/Paginated';
import { useSnackBar } from '../common/SnackBar/hook';
import { SnackType } from '../common/SnackBar/types';
import { _getUserDetails } from '../utils/storeMethods';

/* Context for useMeals hook */
export const MealContext = createContext({
  entities: [] as UserMeal[],
} as Paginated<UserMeal> | null);

export const OffsetContext = createContext(0);

/* Styled components appear not be "export-able" */
const PaginateFAB = styled(FAB).attrs({ variant: 'surface' })`
  position: absolute;
  bottom: 10px;
  border-radius: 30px;
`;

const StyledSurface = styled(Surface)`
  position: absolute;
  height: 80px;
  bottom: 0px;
  right: 0px;
  left: 0px;
`;

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

  // handlePageChange
  const handlePageChange = (forward: boolean) => {
    setIsLoading(true);
    setPagedMealsReq(s => {
      if (forward) {
        return { ...s, offset: s.offset + 1 };
      } else {
        if (s.offset > 1) {
          return { ...s, offset: s.offset - 1 };
        }
        return s;
      }
    });
  };

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
            <StyledSurface
              style={{
                backgroundColor: theme.colors.primary,
              }}>
              {hasBackward && (
                <PaginateFAB
                  disabled={!hasBackward}
                  icon="arrow-left"
                  style={{ left: 10 }}
                  onPress={() => handlePageChange(false)}
                />
              )}
              <FAB
                icon="plus"
                variant="surface"
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  bottom: 10,
                }}
                onPress={() => {
                  navigate('/meal/create');
                }}
              />
              {hasForward && (
                <PaginateFAB
                  disabled={!hasForward}
                  icon="arrow-right"
                  style={{ right: 10 }}
                  onPress={() => handlePageChange(true)}
                />
              )}
            </StyledSurface>
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

function fetchMeals(
  userId: string,
  pagedMealsReq: PaginatedMealsRequest,
  setPagedMeals: (
    value: React.SetStateAction<Paginated<UserMeal> | null>,
  ) => void,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  addSnack: (message: string, type: SnackType) => null,
) {
  fetch(`http://localhost:3000/meals/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(pagedMealsReq),
  })
    .then(async res => {
      if (res.ok) {
        return res.json();
      }

      const body = await res.json();
      throw new Error(`${body.statusCode}, ${body.statusText}`);
    })
    .then(val => {
      setPagedMeals(val);
      setIsLoading(false);
    })
    .catch(err => {
      console.log(err);
      setIsLoading(false);
      addSnack('Error retrieving meals', SnackType.FAILURE);
    });
}

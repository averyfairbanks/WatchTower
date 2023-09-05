import { ReactNode, createContext, useEffect, useState } from 'react';
import { FAB, Surface, useTheme } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import styled from 'styled-components';
import { UserMeal } from '../Meal/types';
import { useSearchbarContext } from '../common/AppBar/hook';
import { useSnackBar } from '../common/SnackBar/hook';
import { SnackType } from '../common/SnackBar/types';
import { _getUserDetails } from '../utils/storeMethods';

const PaginateFAB = styled(FAB).attrs({ variant: 'surface' })`
  position: absolute;
  bottom: 10px;
  border-radius: 30px;
`;

interface MealLoaderProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

export const MealContext = createContext([] as UserMeal[] | null);

export const MealsProvider: React.FC<MealLoaderProps> = ({
  setIsLoading,
  children,
}) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const searchTerm = useSearchbarContext();
  const { addSnack } = useSnackBar();

  const { id: userId } = _getUserDetails();

  const [meals, setMeals] = useState<UserMeal[] | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/meals/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ searchTerm: searchTerm }),
    })
      .then(async res => {
        if (res.ok) {
          return res.json();
        }

        const body = await res.json();
        throw new Error(`${body.statusCode}, ${body.statusText}`);
      })
      .then(val => {
        setMeals(val);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
        addSnack('Error retrieving meals', SnackType.FAILURE);
      });
  }, [searchTerm]);

  return (
    <MealContext.Provider value={meals}>
      {children}
      {!!meals?.length && (
        <>
          <Surface
            style={{
              backgroundColor: theme.colors.primary,
              position: 'absolute',
              height: 80,
              bottom: 0,
              right: 0,
              left: 0,
            }}>
            <PaginateFAB
              disabled={false}
              icon="arrow-left"
              style={{ left: 10 }}
            />
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
            <PaginateFAB
              disabled={false}
              icon="arrow-right"
              style={{ right: 10 }}
            />
          </Surface>
        </>
      )}
    </MealContext.Provider>
  );
};

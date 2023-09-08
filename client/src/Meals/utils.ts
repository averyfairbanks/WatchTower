import { UserMeal } from '../Meal/types';
import {
  Paginated,
  PaginatedMealsRequest,
} from '../common/Pagination/Paginated';
import { SnackType } from '../common/SnackBar/types';

export const handlePageChange = (
  forward: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setPagedMealsReq: React.Dispatch<React.SetStateAction<PaginatedMealsRequest>>,
) => {
  setIsLoading(true);
  setPagedMealsReq(s => {
    if (forward) {
      return { ...s, page: s.page + 1 };
    } else {
      if (s.page > 1) {
        return { ...s, page: s.page - 1 };
      }
      return s;
    }
  });
};

export const fetchMeals = (
  userId: string,
  pagedMealsReq: PaginatedMealsRequest,
  setPagedMeals: (
    value: React.SetStateAction<Paginated<UserMeal> | null>,
  ) => void,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  addSnack: (message: string, type: SnackType) => null,
) => {
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
};

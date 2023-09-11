import { UserMeal } from '../Meal/types';
import { Paginated } from '../common/Pagination/Paginated';

export const handleSubscribe = (
  prev: { meals: Paginated<UserMeal> },
  options: {
    subscriptionData: {
      data: { mealLogged: UserMeal };
    };
    variables?: {
      userId: string;
      page: number;
      pageLimit: number;
      searchTerm: string;
    };
  },
) => {
  const { subscriptionData, variables } = options;
  if (!subscriptionData) return prev;

  const loggedMeal = subscriptionData.data.mealLogged;
  console.log(variables);

  const existingMeals = prev.meals.entities.filter(
    (meal: UserMeal) => meal.id !== loggedMeal.id,
  );
  const existingPageDetails = prev.meals.pageDetails;
  const newTotal = existingPageDetails.total + 1;

  return Object.assign({}, prev, {
    meals: Object.assign({}, prev.meals, {
      entities: [loggedMeal, ...existingMeals].splice(
        0,
        variables?.pageLimit ?? 10,
      ),
      pageDetails: Object.assign({}, existingPageDetails, {
        hasForward:
          newTotal > (variables?.pageLimit ?? 10) &&
          (variables?.page ?? 1 === 1),
        total: newTotal,
      }),
    }),
  });
};

export const safeDestructure = (data: any): Paginated<UserMeal> => {
  const { entities, pageDetails } = data?.meals;
  const { total, hasBackward, hasForward } = pageDetails;
  return {
    entities: entities ? entities : [],
    pageDetails: { hasBackward, hasForward, total: total ?? 0 },
  };
};

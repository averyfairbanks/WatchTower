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

  const existingMeals = prev.meals.entities.filter(
    (meal: UserMeal) => meal.id !== loggedMeal.id,
  );
  const existingPageDetails = prev.meals.pageDetails;

  return Object.assign({}, prev, {
    meals: Object.assign({}, prev.meals, {
      entities: [loggedMeal, ...existingMeals].splice(
        0,
        variables?.pageLimit ?? 10,
      ),
      pageDetails: Object.assign({}, existingPageDetails, {
        total: existingPageDetails.total + 1,
      }),
    }),
  });
};

export const safeDestructure = (data: any) => {
  const { entities, pageDetails } = data?.meals;
  const { total, hasBackward, hasForward } = pageDetails;
  return {
    meals: entities ? entities : [],
    pageDetails: { hasBackward, hasForward, total: total ?? 0 },
  };
};

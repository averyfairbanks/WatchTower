import { UserMeal } from '../Meal/types';
import { Paginated } from '../common/Pagination/Paginated';

export const safeDestructure = (data: any): Paginated<UserMeal> => {
  const { entities, pageDetails } = data?.meals;
  const { total, hasBackward, hasForward } = pageDetails;
  return {
    entities: entities ? entities : [],
    pageDetails: { hasBackward, hasForward, total: total ?? 0 },
  };
};

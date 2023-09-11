import { gql } from '@apollo/client';

export const DELETE_MEAL = gql`
  mutation DeleteMeal($userId: String!, $mealId: String!) {
    deleteMeal(userId: $userId, mealId: $mealId)
  }
`;

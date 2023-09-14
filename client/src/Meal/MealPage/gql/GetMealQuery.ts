import { gql } from '@apollo/client';

export const GET_MEAL_QUERY = gql`
  query GetMealQuery($userId: String!, $mealId: String!) {
    meal(userId: $userId, mealId: $mealId) {
      userId
      id
      name
      description
      photoUrl
      timeLogged
      notified
    }
  }
`;

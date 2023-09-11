import { gql, useMutation } from '@apollo/client';

export const LOG_MEAL_MUTATION = gql`
  mutation LogMealMutation($input: CreateMealInput!) {
    logMeal(input: $input) {
      id
      userId
      name
      description
      photoUrl
      timeLogged
      notified
    }
  }
`;

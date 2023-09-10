import gql from 'graphql-tag';

export const MEAL_LOGGED_SUBSCRIPTION = gql`
  subscription MealLoggedSub {
    mealLogged {
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
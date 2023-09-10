import { gql } from '@apollo/client';

export const GET_ALL_MEALS_QUERY = gql`
  query GetAllMealsQuery(
    $userId: String!
    $page: Int
    $pageLimit: Int
    $searchTerm: String
  ) {
    meals(
      userId: $userId
      page: $page
      pageLimit: $pageLimit
      searchTerm: $searchTerm
    ) {
      entities {
        id
        userId
        name
        description
        photoUrl
        timeLogged
        notified
      }
      pageDetails {
        hasBackward
        hasForward
        total
      }
    }
  }
`;

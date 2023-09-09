import { gql } from "@apollo/client";

export const GET_ALL_MEALS_QUERY = gql`
  query ($userId: String!, $page: Int, $pageLimit: Int) {
    meals(userId: $userId, page: $page, pageLimit: $pageLimit) {
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
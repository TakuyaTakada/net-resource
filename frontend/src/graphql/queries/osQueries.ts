import { gql } from "graphql.macro";

export const OS_LIST_QUERY = gql`
  query GethostOSes($input: SearchHostOSInput!) {
    getHostOSes(input: $input) {
      id
      updatedAt
      name
    }
  }
`;

export const OS_DETAIL_QUERY = gql`
  query GetHostOS($input: GetIdInput!) {
    getHostOS(input: $input) {
      id
      createdAt
      updatedAt
      name
      note
      hosts {
        id
        name
      }
    }
  }
`;

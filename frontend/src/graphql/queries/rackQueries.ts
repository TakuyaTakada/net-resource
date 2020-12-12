import { gql } from "graphql.macro";

export const RACK_LIST_QUERY = gql`
  query GetRacks($input: SearchRackInput!) {
    getRacks(input: $input) {
      id
      updatedAt
      name
      status
      site {
        id
        name
      }
    }
  }
`;

export const RACK_DETAIL_QUERY = gql`
  query GetRack($input: GetIdInput!) {
    getRack(input: $input) {
      id
      createdAt
      updatedAt
      name
      status
      units
      site {
        id
        name
      }
      devices {
        id
        name
        position
        deviceModel {
          id
          name
          height
          width
        }
        rack {
          id
        }
      }
      note
    }
  }
`;

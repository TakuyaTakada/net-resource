import { gql } from "graphql.macro";

export const VRF_LIST_QUERY = gql`
  query GetVrfs($input: SearchVrfInput!) {
    getVrfs(input: $input) {
      id
      updatedAt
      name
    }
  }
`;

export const VRF_DETAIL_QUERY = gql`
  query GetVrf($input: GetIdInput!) {
    getVrf(input: $input) {
      id
      createdAt
      updatedAt
      name
      note
      ipSegments {
        id
        ipSegment
      }
    }
  }
`;

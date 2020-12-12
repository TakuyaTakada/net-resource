import { gql } from "graphql.macro";

export const IPADDR_UPDATE_MUTATION = gql`
  mutation UpdateIpaddr($input: UpdateIpaddrInput!) {
    updateIpaddr(input: $input) {
      id
      createdAt
      updatedAt
      ip
      status
      type
      note
      host {
        id
        name
      }
      ipSegment {
        id
        ipSegment
      }
    }
  }
`;

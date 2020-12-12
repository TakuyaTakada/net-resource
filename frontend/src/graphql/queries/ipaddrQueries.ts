import { gql } from "graphql.macro";

export const IPADDR_LIST_QUERY = gql`
  query GetIpaddrs($input: SearchIpaddrInput!) {
    getIpaddrs(input: $input) {
      id
      updatedAt
      ip
      status
      type
    }
  }
`;

export const IPADDR_DETAIL_QUERY = gql`
  query GetIpaddr($input: GetIdInput!) {
    getIpaddr(input: $input) {
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

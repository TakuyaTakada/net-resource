import { gql } from "graphql.macro";

export const HOST_LIST_QUERY = gql`
  query GetHosts($input: SearchHostInput!) {
    getHosts(input: $input) {
      id
      updatedAt
      name
      status
      mgmtIp {
        id
        ip
      }
    }
  }
`;

export const HOST_DETAIL_QUERY = gql`
  query GetHost($input: GetIdInput!) {
    getHost(input: $input) {
      id
      createdAt
      updatedAt
      name
      status
      protocol
      note
      devices {
        id
        name
      }
      mgmtIp {
        id
        ip
      }
      hostOS {
        id
        name
      }
    }
  }
`;

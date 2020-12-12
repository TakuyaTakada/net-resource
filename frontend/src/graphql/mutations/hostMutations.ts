import { gql } from "graphql.macro";

export const HOST_UPDATE_MUTATION = gql`
  mutation UpdateHost($input: UpdateHostInput!) {
    updateHost(input: $input) {
      id
      createdAt
      updatedAt
      name
      status
      note
      protocol
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

export const HOST_CREATE_MUTATION = gql`
  mutation CreateHost($input: CreateHostInput!) {
    createHost(input: $input) {
      id
      createdAt
      updatedAt
      name
      status
      note
      protocol
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

export const HOST_BULK_DELETE_MUTATION = gql`
  mutation BulkDeleteHost($input: BulkIdInput!) {
    bulkDeleteHost(input: $input) {
      id
      name
    }
  }
`;

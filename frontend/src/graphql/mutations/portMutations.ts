import { gql } from "graphql.macro";

export const PORT_UPDATE_MUTATION = gql`
  mutation UpdatePort($input: UpdatePortInput!) {
    updatePort(input: $input) {
      id
      createdAt
      updatedAt
      name
      status
      note
      device {
        id
        name
      }
    }
  }
`;

export const PORT_BULK_CREATE_MUTATION = gql`
  mutation BulkCreatePort($input: BulkCreatePortInput!) {
    bulkCreatePort(input: $input) {
      id
      createdAt
      updatedAt
      name
      status
      note
      device {
        id
        name
      }
    }
  }
`;

export const PORT_BULK_DELETE_MUTATION = gql`
  mutation BulkDeletePort($input: BulkIdInput!) {
    bulkDeletePort(input: $input) {
      id
      name
    }
  }
`;

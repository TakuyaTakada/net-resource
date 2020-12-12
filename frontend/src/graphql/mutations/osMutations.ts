import { gql } from "graphql.macro";

export const OS_UPDATE_MUTATION = gql`
  mutation UpdateHostOS($input: UpdateHostOSInput!) {
    updateHostOS(input: $input) {
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

export const OS_CREATE_MUTATION = gql`
  mutation CreateHostOS($input: CreateHostOSInput!) {
    createHostOS(input: $input) {
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

export const OS_BULK_DELETE_MUTATION = gql`
  mutation BulkDeleteHostOS($input: BulkIdInput!) {
    bulkDeleteHostOS(input: $input) {
      id
      name
    }
  }
`;

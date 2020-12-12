import { gql } from "graphql.macro";

export const RACK_UPDATE_MUTATION = gql`
  mutation UpdateRack($input: UpdateRackInput!) {
    updateRack(input: $input) {
      createdAt
      updatedAt
      name
      status
      units
      site {
        id
        name
      }
      note
    }
  }
`;

export const RACK_CREATE_MUTATION = gql`
  mutation CreateRack($input: CreateRackInput!) {
    createRack(input: $input) {
      createdAt
      updatedAt
      name
      status
      note
    }
  }
`;

export const RACK_BULK_DELETE_MUTATION = gql`
  mutation BulkDeleteRacks($input: BulkIdInput!) {
    bulkDeleteRack(input: $input) {
      id
      name
      status
      note
    }
  }
`;

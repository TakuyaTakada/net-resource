import { gql } from "graphql.macro";

export const MODEL_UPDATE_MUTATION = gql`
  mutation UpdateDeviceModel($input: UpdateDeviceModelInput!) {
    updateDeviceModel(input: $input) {
      id
      createdAt
      updatedAt
      name
      height
      width
      note
      devices {
        id
        name
      }
    }
  }
`;

export const MODEL_CREATE_MUTATION = gql`
  mutation CreateDeviceModel($input: CreateDeviceModelInput!) {
    createDeviceModel(input: $input) {
      id
      createdAt
      updatedAt
      name
      height
      width
      note
      devices {
        id
        name
      }
    }
  }
`;

export const MODEL_BULK_DELETE_MUTATION = gql`
  mutation BulkDeleteDeviceModel($input: BulkIdInput!) {
    bulkDeleteDeviceModel(input: $input) {
      id
      name
    }
  }
`;

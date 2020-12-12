import { gql } from "graphql.macro";

export const DEVICE_UPDATE_MUTATION = gql`
  mutation UpdateDevice($input: UpdateDeviceInput!) {
    updateDevice(input: $input) {
      id
      createdAt
      updatedAt
      name
      status
      position
      note
      rack {
        id
        name
      }
      deviceModel {
        id
        name
      }
      host {
        id
        name
      }
    }
  }
`;

export const DEVICE_BULK_UPDATE_MUTATION = gql`
  mutation BulkUpdateMutation($input: BulkUpdateDeviceInput!) {
    bulkUpdateDevice(input: $input) {
      id
      createdAt
      updatedAt
      name
      status
      position
      note
      rack {
        id
        name
      }
      deviceModel {
        id
        name
      }
      host {
        id
        name
      }
    }
  }
`;

export const DEVICE_CREATE_MUTATION = gql`
  mutation CreateDevice($input: CreateDeviceInput!) {
    createDevice(input: $input) {
      id
      createdAt
      updatedAt
      name
      status
      position
      note
      rack {
        id
        name
      }
      deviceModel {
        id
        name
      }
      host {
        id
        name
      }
    }
  }
`;

export const DEVICE_BULK_DELETE_MUTATION = gql`
  mutation BulkDeleteDevice($input: BulkIdInput!) {
    bulkDeleteDevice(input: $input) {
      id
      name
    }
  }
`;

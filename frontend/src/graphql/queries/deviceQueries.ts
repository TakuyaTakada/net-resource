import { gql } from "graphql.macro";

export const DEVICE_LIST_QUERY = gql`
  query GetDevices($input: SearchDeviceInput!) {
    getDevices(input: $input) {
      id
      updatedAt
      name
      status
    }
  }
`;

export const DEVICE_LIST_FOR_RACK_QUERY = gql`
  query GetDevicesForRack($input: SearchDeviceInput!) {
    getDevices(input: $input) {
      id
      name
      position
      deviceModel {
        id
        name
        height
        width
      }
      rack {
        id
      }
    }
  }
`;

export const DEVICE_DETAIL_QUERY = gql`
  query GetDevice($input: GetIdInput!) {
    getDevice(input: $input) {
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

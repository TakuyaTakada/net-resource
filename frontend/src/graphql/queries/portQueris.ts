import { gql } from "graphql.macro";

export const PORT_LIST_QUERY = gql`
  query GetPorts($input: SearchPortInput!) {
    getPorts(input: $input) {
      id
      name
      status
      note
    }
  }
`;

export const PORT_LIST_AND_DEVICE_DETAIL_QUERY = gql`
  query GetPortsAndDevice(
    $portInput: SearchPortInput!
    $deviceInput: GetIdInput!
  ) {
    getPorts(input: $portInput) {
      id
      name
      status
      note
    }
    getDevice(input: $deviceInput) {
      id
      name
      status
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

export const PORT_DETAIL_QUERY = gql`
  query GetPort($input: GetIdInput!) {
    getPort(input: $input) {
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

import { gql } from "graphql.macro";

export const MODEL_LIST_QUERY = gql`
  query GetDeviceModels($input: SearchDeviceModelInput!) {
    getDeviceModels(input: $input) {
      id
      updatedAt
      name
      height
    }
  }
`;

export const MODEL_DETAIL_QUERY = gql`
  query GetDeviceModel($input: GetIdInput!) {
    getDeviceModel(input: $input) {
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

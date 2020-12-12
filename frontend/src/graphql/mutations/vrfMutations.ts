import { gql } from "graphql.macro";

export const VRF_UPDATE_MUTATION = gql`
  mutation UpdateVrf($input: UpdateVrfInput!) {
    updateVrf(input: $input) {
      id
      createdAt
      updatedAt
      name
      note
      ipSegments {
        id
        ipSegment
      }
    }
  }
`;

export const VRF_CREATE_MUTATION = gql`
  mutation CreateVrf($input: CreateVrfInput!) {
    createVrf(input: $input) {
      id
      createdAt
      updatedAt
      name
      note
      ipSegments {
        id
        ipSegment
      }
    }
  }
`;

export const VRF_BULK_DELETE_MUTATION = gql`
  mutation BulkDeleteVrf($input: BulkIdInput!) {
    bulkDeleteVrf(input: $input) {
      id
      name
    }
  }
`;

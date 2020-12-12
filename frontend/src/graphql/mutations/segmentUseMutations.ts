import { gql } from "graphql.macro";

export const SEGMENT_USE_UPDATE_MUTATION = gql`
  mutation UpdateSegmentUse($input: UpdateSegmentUseInput!) {
    updateSegmentUse(input: $input) {
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

export const SEGMENT_USE_CREATE_MUTATION = gql`
  mutation CreateSegmentUse($input: CreateSegmentUseInput!) {
    createSegmentUse(input: $input) {
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

export const SEGMENT_USE_BULK_DELETE_MUTATION = gql`
  mutation BulkDeleteSegmentUse($input: BulkIdInput!) {
    bulkDeleteSegmentUse(input: $input) {
      id
      name
    }
  }
`;

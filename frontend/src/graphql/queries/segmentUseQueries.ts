import { gql } from "graphql.macro";

export const SEGMENT_USE_LIST_QUERY = gql`
  query GetSegmentUses($input: SearchSegmentUseInput!) {
    getSegmentUses(input: $input) {
      id
      updatedAt
      name
    }
  }
`;

export const SEGMENT_USE_DETAIL_QUERY = gql`
  query GetSegmentUse($input: GetIdInput!) {
    getSegmentUse(input: $input) {
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

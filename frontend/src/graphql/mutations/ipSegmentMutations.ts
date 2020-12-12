import { gql } from "graphql.macro";

export const IP_SEGMENT_UPDATE_MUTATION = gql`
  mutation UpdateIpSegment($input: UpdateIpSegmentInput!) {
    updateIpSegment(input: $input) {
      id
      createdAt
      updatedAt
      ipSegment
      vrf {
        id
        name
      }
      use {
        id
        name
      }
      ipaddrs {
        id
        ip
      }
      note
    }
  }
`;

export const IP_SEGMENT_CREATE_MUTATION = gql`
  mutation CreateIpSegment($input: CreateIpSegmentInput!) {
    createIpSegment(input: $input) {
      id
      createdAt
      updatedAt
      ipSegment
      vrf {
        id
        name
      }
      use {
        id
        name
      }
      ipaddrs {
        id
        ip
      }
      note
    }
  }
`;

export const IP_SEGMENT_BULK_DELETE_MUTATION = gql`
  mutation BulkDeleteIpSegment($input: BulkIdInput!) {
    bulkDeleteIpSegment(input: $input) {
      id
      ipSegment
    }
  }
`;

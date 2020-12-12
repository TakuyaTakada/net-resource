import { gql } from "graphql.macro";

export const IP_SEGMENT_LIST_QUERY = gql`
  query GetIpSegments($input: SearchIpSegmentInput!) {
    getIpSegments(input: $input) {
      id
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
    }
  }
`;

export const IP_SEGMENT_DETAIL_QUERY = gql`
  query GetIpSegment($input: GetIdInput!) {
    getIpSegment(input: $input) {
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

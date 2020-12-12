/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SearchIpSegmentInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetIpSegments
// ====================================================

export interface GetIpSegments_getIpSegments_vrf {
  __typename: "Vrf";
  id: string;
  name: string;
}

export interface GetIpSegments_getIpSegments_use {
  __typename: "SegmentUse";
  id: string;
  name: string;
}

export interface GetIpSegments_getIpSegments {
  __typename: "IpSegment";
  id: string;
  updatedAt: any;
  ipSegment: any;
  vrf: GetIpSegments_getIpSegments_vrf | null;
  use: GetIpSegments_getIpSegments_use | null;
}

export interface GetIpSegments {
  getIpSegments: GetIpSegments_getIpSegments[];
}

export interface GetIpSegmentsVariables {
  input: SearchIpSegmentInput;
}

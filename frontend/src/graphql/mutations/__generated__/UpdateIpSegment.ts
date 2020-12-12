/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateIpSegmentInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateIpSegment
// ====================================================

export interface UpdateIpSegment_updateIpSegment_vrf {
  __typename: "Vrf";
  id: string;
  name: string;
}

export interface UpdateIpSegment_updateIpSegment_use {
  __typename: "SegmentUse";
  id: string;
  name: string;
}

export interface UpdateIpSegment_updateIpSegment_ipaddrs {
  __typename: "Ipaddr";
  id: string;
  ip: any;
}

export interface UpdateIpSegment_updateIpSegment {
  __typename: "IpSegment";
  id: string;
  createdAt: any;
  updatedAt: any;
  ipSegment: any;
  vrf: UpdateIpSegment_updateIpSegment_vrf | null;
  use: UpdateIpSegment_updateIpSegment_use | null;
  ipaddrs: (UpdateIpSegment_updateIpSegment_ipaddrs | null)[] | null;
  note: string | null;
}

export interface UpdateIpSegment {
  updateIpSegment: UpdateIpSegment_updateIpSegment;
}

export interface UpdateIpSegmentVariables {
  input: UpdateIpSegmentInput;
}

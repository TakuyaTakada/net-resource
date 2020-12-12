/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GetIdInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetIpSegment
// ====================================================

export interface GetIpSegment_getIpSegment_vrf {
  __typename: "Vrf";
  id: string;
  name: string;
}

export interface GetIpSegment_getIpSegment_use {
  __typename: "SegmentUse";
  id: string;
  name: string;
}

export interface GetIpSegment_getIpSegment_ipaddrs {
  __typename: "Ipaddr";
  id: string;
  ip: any;
}

export interface GetIpSegment_getIpSegment {
  __typename: "IpSegment";
  id: string;
  createdAt: any;
  updatedAt: any;
  ipSegment: any;
  vrf: GetIpSegment_getIpSegment_vrf | null;
  use: GetIpSegment_getIpSegment_use | null;
  ipaddrs: (GetIpSegment_getIpSegment_ipaddrs | null)[] | null;
  note: string | null;
}

export interface GetIpSegment {
  getIpSegment: GetIpSegment_getIpSegment;
}

export interface GetIpSegmentVariables {
  input: GetIdInput;
}

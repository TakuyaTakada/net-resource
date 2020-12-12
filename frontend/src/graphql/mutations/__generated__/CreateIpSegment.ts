/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateIpSegmentInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateIpSegment
// ====================================================

export interface CreateIpSegment_createIpSegment_vrf {
  __typename: "Vrf";
  id: string;
  name: string;
}

export interface CreateIpSegment_createIpSegment_use {
  __typename: "SegmentUse";
  id: string;
  name: string;
}

export interface CreateIpSegment_createIpSegment_ipaddrs {
  __typename: "Ipaddr";
  id: string;
  ip: any;
}

export interface CreateIpSegment_createIpSegment {
  __typename: "IpSegment";
  id: string;
  createdAt: any;
  updatedAt: any;
  ipSegment: any;
  vrf: CreateIpSegment_createIpSegment_vrf | null;
  use: CreateIpSegment_createIpSegment_use | null;
  ipaddrs: (CreateIpSegment_createIpSegment_ipaddrs | null)[] | null;
  note: string | null;
}

export interface CreateIpSegment {
  createIpSegment: CreateIpSegment_createIpSegment;
}

export interface CreateIpSegmentVariables {
  input: CreateIpSegmentInput;
}

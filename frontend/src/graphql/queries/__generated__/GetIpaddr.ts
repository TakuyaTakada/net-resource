/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GetIdInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetIpaddr
// ====================================================

export interface GetIpaddr_getIpaddr_host {
  __typename: "Host";
  id: string;
  name: string;
}

export interface GetIpaddr_getIpaddr_ipSegment {
  __typename: "IpSegment";
  id: string;
  ipSegment: any;
}

export interface GetIpaddr_getIpaddr {
  __typename: "Ipaddr";
  id: string;
  createdAt: any;
  updatedAt: any;
  ip: any;
  status: number;
  type: number;
  note: string | null;
  host: GetIpaddr_getIpaddr_host | null;
  ipSegment: GetIpaddr_getIpaddr_ipSegment;
}

export interface GetIpaddr {
  getIpaddr: GetIpaddr_getIpaddr;
}

export interface GetIpaddrVariables {
  input: GetIdInput;
}

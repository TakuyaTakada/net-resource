/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateIpaddrInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateIpaddr
// ====================================================

export interface UpdateIpaddr_updateIpaddr_host {
  __typename: "Host";
  id: string;
  name: string;
}

export interface UpdateIpaddr_updateIpaddr_ipSegment {
  __typename: "IpSegment";
  id: string;
  ipSegment: any;
}

export interface UpdateIpaddr_updateIpaddr {
  __typename: "Ipaddr";
  id: string;
  createdAt: any;
  updatedAt: any;
  ip: any;
  status: number;
  type: number;
  note: string | null;
  host: UpdateIpaddr_updateIpaddr_host | null;
  ipSegment: UpdateIpaddr_updateIpaddr_ipSegment;
}

export interface UpdateIpaddr {
  updateIpaddr: UpdateIpaddr_updateIpaddr;
}

export interface UpdateIpaddrVariables {
  input: UpdateIpaddrInput;
}

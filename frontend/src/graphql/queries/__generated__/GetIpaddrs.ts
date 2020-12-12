/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SearchIpaddrInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetIpaddrs
// ====================================================

export interface GetIpaddrs_getIpaddrs {
  __typename: "Ipaddr";
  id: string;
  updatedAt: any;
  ip: any;
  status: number;
  type: number;
}

export interface GetIpaddrs {
  getIpaddrs: GetIpaddrs_getIpaddrs[];
}

export interface GetIpaddrsVariables {
  input: SearchIpaddrInput;
}

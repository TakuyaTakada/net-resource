/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SearchHostInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetHosts
// ====================================================

export interface GetHosts_getHosts_mgmtIp {
  __typename: "Ipaddr";
  id: string;
  ip: any;
}

export interface GetHosts_getHosts {
  __typename: "Host";
  id: string;
  updatedAt: any;
  name: string;
  status: number;
  mgmtIp: GetHosts_getHosts_mgmtIp | null;
}

export interface GetHosts {
  getHosts: GetHosts_getHosts[];
}

export interface GetHostsVariables {
  input: SearchHostInput;
}

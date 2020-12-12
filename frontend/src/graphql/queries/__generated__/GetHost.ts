/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GetIdInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetHost
// ====================================================

export interface GetHost_getHost_devices {
  __typename: "Device";
  id: string;
  name: string;
}

export interface GetHost_getHost_mgmtIp {
  __typename: "Ipaddr";
  id: string;
  ip: any;
}

export interface GetHost_getHost_hostOS {
  __typename: "HostOS";
  id: string;
  name: string;
}

export interface GetHost_getHost {
  __typename: "Host";
  id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  status: number;
  protocol: number | null;
  note: string | null;
  devices: (GetHost_getHost_devices | null)[] | null;
  mgmtIp: GetHost_getHost_mgmtIp | null;
  hostOS: GetHost_getHost_hostOS | null;
}

export interface GetHost {
  getHost: GetHost_getHost;
}

export interface GetHostVariables {
  input: GetIdInput;
}

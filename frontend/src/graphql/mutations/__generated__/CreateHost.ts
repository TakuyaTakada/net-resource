/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateHostInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateHost
// ====================================================

export interface CreateHost_createHost_devices {
  __typename: "Device";
  id: string;
  name: string;
}

export interface CreateHost_createHost_mgmtIp {
  __typename: "Ipaddr";
  id: string;
  ip: any;
}

export interface CreateHost_createHost_hostOS {
  __typename: "HostOS";
  id: string;
  name: string;
}

export interface CreateHost_createHost {
  __typename: "Host";
  id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  status: number;
  note: string | null;
  protocol: number | null;
  devices: (CreateHost_createHost_devices | null)[] | null;
  mgmtIp: CreateHost_createHost_mgmtIp | null;
  hostOS: CreateHost_createHost_hostOS | null;
}

export interface CreateHost {
  createHost: CreateHost_createHost;
}

export interface CreateHostVariables {
  input: CreateHostInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateHostInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateHost
// ====================================================

export interface UpdateHost_updateHost_devices {
  __typename: "Device";
  id: string;
  name: string;
}

export interface UpdateHost_updateHost_mgmtIp {
  __typename: "Ipaddr";
  id: string;
  ip: any;
}

export interface UpdateHost_updateHost_hostOS {
  __typename: "HostOS";
  id: string;
  name: string;
}

export interface UpdateHost_updateHost {
  __typename: "Host";
  id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  status: number;
  note: string | null;
  protocol: number | null;
  devices: (UpdateHost_updateHost_devices | null)[] | null;
  mgmtIp: UpdateHost_updateHost_mgmtIp | null;
  hostOS: UpdateHost_updateHost_hostOS | null;
}

export interface UpdateHost {
  updateHost: UpdateHost_updateHost;
}

export interface UpdateHostVariables {
  input: UpdateHostInput;
}

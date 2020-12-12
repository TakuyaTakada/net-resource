/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GetIdInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetHostOS
// ====================================================

export interface GetHostOS_getHostOS_hosts {
  __typename: "Host";
  id: string;
  name: string;
}

export interface GetHostOS_getHostOS {
  __typename: "HostOS";
  id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  note: string | null;
  hosts: (GetHostOS_getHostOS_hosts | null)[] | null;
}

export interface GetHostOS {
  getHostOS: GetHostOS_getHostOS;
}

export interface GetHostOSVariables {
  input: GetIdInput;
}

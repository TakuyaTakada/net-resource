/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateHostOSInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateHostOS
// ====================================================

export interface UpdateHostOS_updateHostOS_hosts {
  __typename: "Host";
  id: string;
  name: string;
}

export interface UpdateHostOS_updateHostOS {
  __typename: "HostOS";
  id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  note: string | null;
  hosts: (UpdateHostOS_updateHostOS_hosts | null)[] | null;
}

export interface UpdateHostOS {
  updateHostOS: UpdateHostOS_updateHostOS;
}

export interface UpdateHostOSVariables {
  input: UpdateHostOSInput;
}

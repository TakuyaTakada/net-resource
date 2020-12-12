/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateHostOSInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateHostOS
// ====================================================

export interface CreateHostOS_createHostOS_hosts {
  __typename: "Host";
  id: string;
  name: string;
}

export interface CreateHostOS_createHostOS {
  __typename: "HostOS";
  id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  note: string | null;
  hosts: (CreateHostOS_createHostOS_hosts | null)[] | null;
}

export interface CreateHostOS {
  createHostOS: CreateHostOS_createHostOS;
}

export interface CreateHostOSVariables {
  input: CreateHostOSInput;
}

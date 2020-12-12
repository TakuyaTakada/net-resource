/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SearchPortInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetPorts
// ====================================================

export interface GetPorts_getPorts {
  __typename: "Port";
  id: string;
  name: string;
  status: number;
  note: string | null;
}

export interface GetPorts {
  getPorts: GetPorts_getPorts[];
}

export interface GetPortsVariables {
  input: SearchPortInput;
}

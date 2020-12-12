/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GetIdInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetVrf
// ====================================================

export interface GetVrf_getVrf_ipSegments {
  __typename: "IpSegment";
  id: string;
  ipSegment: any;
}

export interface GetVrf_getVrf {
  __typename: "Vrf";
  id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  note: string | null;
  ipSegments: (GetVrf_getVrf_ipSegments | null)[] | null;
}

export interface GetVrf {
  getVrf: GetVrf_getVrf;
}

export interface GetVrfVariables {
  input: GetIdInput;
}

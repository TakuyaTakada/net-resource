/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateVrfInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateVrf
// ====================================================

export interface CreateVrf_createVrf_ipSegments {
  __typename: "IpSegment";
  id: string;
  ipSegment: any;
}

export interface CreateVrf_createVrf {
  __typename: "Vrf";
  id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  note: string | null;
  ipSegments: (CreateVrf_createVrf_ipSegments | null)[] | null;
}

export interface CreateVrf {
  createVrf: CreateVrf_createVrf;
}

export interface CreateVrfVariables {
  input: CreateVrfInput;
}

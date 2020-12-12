/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateVrfInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateVrf
// ====================================================

export interface UpdateVrf_updateVrf_ipSegments {
  __typename: "IpSegment";
  id: string;
  ipSegment: any;
}

export interface UpdateVrf_updateVrf {
  __typename: "Vrf";
  id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  note: string | null;
  ipSegments: (UpdateVrf_updateVrf_ipSegments | null)[] | null;
}

export interface UpdateVrf {
  updateVrf: UpdateVrf_updateVrf;
}

export interface UpdateVrfVariables {
  input: UpdateVrfInput;
}

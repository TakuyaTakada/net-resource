/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateRackInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateRack
// ====================================================

export interface UpdateRack_updateRack_site {
  __typename: "Site";
  id: string;
  name: string;
}

export interface UpdateRack_updateRack {
  __typename: "Rack";
  createdAt: any;
  updatedAt: any;
  name: string;
  status: number;
  units: number;
  site: UpdateRack_updateRack_site | null;
  note: string | null;
}

export interface UpdateRack {
  updateRack: UpdateRack_updateRack;
}

export interface UpdateRackVariables {
  input: UpdateRackInput;
}

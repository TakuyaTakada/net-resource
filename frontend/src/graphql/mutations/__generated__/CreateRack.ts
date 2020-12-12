/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateRackInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateRack
// ====================================================

export interface CreateRack_createRack {
  __typename: "Rack";
  createdAt: any;
  updatedAt: any;
  name: string;
  status: number;
  note: string | null;
}

export interface CreateRack {
  createRack: CreateRack_createRack;
}

export interface CreateRackVariables {
  input: CreateRackInput;
}

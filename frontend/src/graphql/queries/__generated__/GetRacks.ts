/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SearchRackInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetRacks
// ====================================================

export interface GetRacks_getRacks_site {
  __typename: "Site";
  id: string;
  name: string;
}

export interface GetRacks_getRacks {
  __typename: "Rack";
  id: string;
  updatedAt: any;
  name: string;
  status: number;
  site: GetRacks_getRacks_site | null;
}

export interface GetRacks {
  getRacks: GetRacks_getRacks[];
}

export interface GetRacksVariables {
  input: SearchRackInput;
}

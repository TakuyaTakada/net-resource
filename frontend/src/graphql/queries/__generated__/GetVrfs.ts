/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SearchVrfInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetVrfs
// ====================================================

export interface GetVrfs_getVrfs {
  __typename: "Vrf";
  id: string;
  updatedAt: any;
  name: string;
}

export interface GetVrfs {
  getVrfs: GetVrfs_getVrfs[];
}

export interface GetVrfsVariables {
  input: SearchVrfInput;
}

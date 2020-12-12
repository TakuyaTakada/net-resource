/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateSiteInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateSite
// ====================================================

export interface UpdateSite_updateSite {
  __typename: "Site";
  createdAt: any;
  updatedAt: any;
  name: string;
  status: number;
  postalCode: string | null;
  phoneNumber: string | null;
  address: string | null;
  note: string | null;
}

export interface UpdateSite {
  updateSite: UpdateSite_updateSite;
}

export interface UpdateSiteVariables {
  input: UpdateSiteInput;
}

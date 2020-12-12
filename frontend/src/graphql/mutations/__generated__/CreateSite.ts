/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateSiteInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateSite
// ====================================================

export interface CreateSite_createSite {
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

export interface CreateSite {
  createSite: CreateSite_createSite;
}

export interface CreateSiteVariables {
  input: CreateSiteInput;
}

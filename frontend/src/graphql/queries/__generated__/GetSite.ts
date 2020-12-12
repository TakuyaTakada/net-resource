/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GetIdInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetSite
// ====================================================

export interface GetSite_getSite {
  __typename: "Site";
  id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  status: number;
  postalCode: string | null;
  phoneNumber: string | null;
  address: string | null;
  note: string | null;
}

export interface GetSite {
  getSite: GetSite_getSite;
}

export interface GetSiteVariables {
  input: GetIdInput;
}

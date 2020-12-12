/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SearchSiteInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetSites
// ====================================================

export interface GetSites_getSites {
  __typename: "Site";
  id: string;
  updatedAt: any;
  name: string;
  status: number;
}

export interface GetSites {
  getSites: GetSites_getSites[];
}

export interface GetSitesVariables {
  input: SearchSiteInput;
}

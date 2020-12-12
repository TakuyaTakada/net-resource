/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { BulkIdInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: BulkDeleteSites
// ====================================================

export interface BulkDeleteSites_bulkDeleteSite {
  __typename: "Site";
  id: string;
  name: string;
  status: number;
  postalCode: string | null;
  phoneNumber: string | null;
  address: string | null;
  note: string | null;
}

export interface BulkDeleteSites {
  bulkDeleteSite: BulkDeleteSites_bulkDeleteSite[];
}

export interface BulkDeleteSitesVariables {
  input: BulkIdInput;
}

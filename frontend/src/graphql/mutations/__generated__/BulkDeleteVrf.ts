/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { BulkIdInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: BulkDeleteVrf
// ====================================================

export interface BulkDeleteVrf_bulkDeleteVrf {
  __typename: "Vrf";
  id: string;
  name: string;
}

export interface BulkDeleteVrf {
  bulkDeleteVrf: BulkDeleteVrf_bulkDeleteVrf[];
}

export interface BulkDeleteVrfVariables {
  input: BulkIdInput;
}

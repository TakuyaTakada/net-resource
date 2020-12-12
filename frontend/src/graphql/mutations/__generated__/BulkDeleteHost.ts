/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { BulkIdInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: BulkDeleteHost
// ====================================================

export interface BulkDeleteHost_bulkDeleteHost {
  __typename: "Host";
  id: string;
  name: string;
}

export interface BulkDeleteHost {
  bulkDeleteHost: BulkDeleteHost_bulkDeleteHost[];
}

export interface BulkDeleteHostVariables {
  input: BulkIdInput;
}

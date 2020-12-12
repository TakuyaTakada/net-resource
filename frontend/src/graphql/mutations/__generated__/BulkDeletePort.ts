/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { BulkIdInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: BulkDeletePort
// ====================================================

export interface BulkDeletePort_bulkDeletePort {
  __typename: "Port";
  id: string;
  name: string;
}

export interface BulkDeletePort {
  bulkDeletePort: BulkDeletePort_bulkDeletePort[];
}

export interface BulkDeletePortVariables {
  input: BulkIdInput;
}

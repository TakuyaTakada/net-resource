/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { BulkIdInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: BulkDeleteHostOS
// ====================================================

export interface BulkDeleteHostOS_bulkDeleteHostOS {
  __typename: "HostOS";
  id: string;
  name: string;
}

export interface BulkDeleteHostOS {
  bulkDeleteHostOS: BulkDeleteHostOS_bulkDeleteHostOS[];
}

export interface BulkDeleteHostOSVariables {
  input: BulkIdInput;
}

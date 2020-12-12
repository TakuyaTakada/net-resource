/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { BulkIdInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: BulkDeleteSegmentUse
// ====================================================

export interface BulkDeleteSegmentUse_bulkDeleteSegmentUse {
  __typename: "SegmentUse";
  id: string;
  name: string;
}

export interface BulkDeleteSegmentUse {
  bulkDeleteSegmentUse: BulkDeleteSegmentUse_bulkDeleteSegmentUse[];
}

export interface BulkDeleteSegmentUseVariables {
  input: BulkIdInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { BulkIdInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: BulkDeleteRacks
// ====================================================

export interface BulkDeleteRacks_bulkDeleteRack {
  __typename: "Rack";
  id: string;
  name: string;
  status: number;
  note: string | null;
}

export interface BulkDeleteRacks {
  bulkDeleteRack: BulkDeleteRacks_bulkDeleteRack[];
}

export interface BulkDeleteRacksVariables {
  input: BulkIdInput;
}

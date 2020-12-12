/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { BulkIdInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: BulkDeleteDevice
// ====================================================

export interface BulkDeleteDevice_bulkDeleteDevice {
  __typename: "Device";
  id: string;
  name: string;
}

export interface BulkDeleteDevice {
  bulkDeleteDevice: BulkDeleteDevice_bulkDeleteDevice[];
}

export interface BulkDeleteDeviceVariables {
  input: BulkIdInput;
}

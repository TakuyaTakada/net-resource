/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { BulkIdInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: BulkDeleteDeviceModel
// ====================================================

export interface BulkDeleteDeviceModel_bulkDeleteDeviceModel {
  __typename: "DeviceModel";
  id: string;
  name: string;
}

export interface BulkDeleteDeviceModel {
  bulkDeleteDeviceModel: BulkDeleteDeviceModel_bulkDeleteDeviceModel[];
}

export interface BulkDeleteDeviceModelVariables {
  input: BulkIdInput;
}

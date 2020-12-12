/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { BulkUpdateDeviceInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: BulkUpdateMutation
// ====================================================

export interface BulkUpdateMutation_bulkUpdateDevice_rack {
  __typename: "Rack";
  id: string;
  name: string;
}

export interface BulkUpdateMutation_bulkUpdateDevice_deviceModel {
  __typename: "DeviceModel";
  id: string;
  name: string;
}

export interface BulkUpdateMutation_bulkUpdateDevice_host {
  __typename: "Host";
  id: string;
  name: string;
}

export interface BulkUpdateMutation_bulkUpdateDevice {
  __typename: "Device";
  id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  status: number;
  position: number | null;
  note: string | null;
  rack: BulkUpdateMutation_bulkUpdateDevice_rack | null;
  deviceModel: BulkUpdateMutation_bulkUpdateDevice_deviceModel;
  host: BulkUpdateMutation_bulkUpdateDevice_host | null;
}

export interface BulkUpdateMutation {
  bulkUpdateDevice: BulkUpdateMutation_bulkUpdateDevice[];
}

export interface BulkUpdateMutationVariables {
  input: BulkUpdateDeviceInput;
}

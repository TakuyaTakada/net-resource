/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SearchDeviceInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetDevices
// ====================================================

export interface GetDevices_getDevices {
  __typename: "Device";
  id: string;
  updatedAt: any;
  name: string;
  status: number;
}

export interface GetDevices {
  getDevices: GetDevices_getDevices[];
}

export interface GetDevicesVariables {
  input: SearchDeviceInput;
}

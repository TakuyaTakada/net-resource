/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GetIdInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetDeviceModel
// ====================================================

export interface GetDeviceModel_getDeviceModel_devices {
  __typename: "Device";
  id: string;
  name: string;
}

export interface GetDeviceModel_getDeviceModel {
  __typename: "DeviceModel";
  id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  height: number;
  width: number;
  note: string | null;
  devices: (GetDeviceModel_getDeviceModel_devices | null)[] | null;
}

export interface GetDeviceModel {
  getDeviceModel: GetDeviceModel_getDeviceModel;
}

export interface GetDeviceModelVariables {
  input: GetIdInput;
}

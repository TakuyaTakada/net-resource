/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateDeviceModelInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateDeviceModel
// ====================================================

export interface UpdateDeviceModel_updateDeviceModel_devices {
  __typename: "Device";
  id: string;
  name: string;
}

export interface UpdateDeviceModel_updateDeviceModel {
  __typename: "DeviceModel";
  id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  height: number;
  width: number;
  note: string | null;
  devices: (UpdateDeviceModel_updateDeviceModel_devices | null)[] | null;
}

export interface UpdateDeviceModel {
  updateDeviceModel: UpdateDeviceModel_updateDeviceModel;
}

export interface UpdateDeviceModelVariables {
  input: UpdateDeviceModelInput;
}

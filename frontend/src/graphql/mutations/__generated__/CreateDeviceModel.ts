/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateDeviceModelInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateDeviceModel
// ====================================================

export interface CreateDeviceModel_createDeviceModel_devices {
  __typename: "Device";
  id: string;
  name: string;
}

export interface CreateDeviceModel_createDeviceModel {
  __typename: "DeviceModel";
  id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  height: number;
  width: number;
  note: string | null;
  devices: (CreateDeviceModel_createDeviceModel_devices | null)[] | null;
}

export interface CreateDeviceModel {
  createDeviceModel: CreateDeviceModel_createDeviceModel;
}

export interface CreateDeviceModelVariables {
  input: CreateDeviceModelInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateDeviceInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateDevice
// ====================================================

export interface CreateDevice_createDevice_rack {
  __typename: "Rack";
  id: string;
  name: string;
}

export interface CreateDevice_createDevice_deviceModel {
  __typename: "DeviceModel";
  id: string;
  name: string;
}

export interface CreateDevice_createDevice_host {
  __typename: "Host";
  id: string;
  name: string;
}

export interface CreateDevice_createDevice {
  __typename: "Device";
  id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  status: number;
  position: number | null;
  note: string | null;
  rack: CreateDevice_createDevice_rack | null;
  deviceModel: CreateDevice_createDevice_deviceModel;
  host: CreateDevice_createDevice_host | null;
}

export interface CreateDevice {
  createDevice: CreateDevice_createDevice;
}

export interface CreateDeviceVariables {
  input: CreateDeviceInput;
}

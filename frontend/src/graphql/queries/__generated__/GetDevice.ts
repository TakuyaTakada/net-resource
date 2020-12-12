/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GetIdInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetDevice
// ====================================================

export interface GetDevice_getDevice_rack {
  __typename: "Rack";
  id: string;
  name: string;
}

export interface GetDevice_getDevice_deviceModel {
  __typename: "DeviceModel";
  id: string;
  name: string;
}

export interface GetDevice_getDevice_host {
  __typename: "Host";
  id: string;
  name: string;
}

export interface GetDevice_getDevice {
  __typename: "Device";
  id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  status: number;
  position: number | null;
  note: string | null;
  rack: GetDevice_getDevice_rack | null;
  deviceModel: GetDevice_getDevice_deviceModel;
  host: GetDevice_getDevice_host | null;
}

export interface GetDevice {
  getDevice: GetDevice_getDevice;
}

export interface GetDeviceVariables {
  input: GetIdInput;
}

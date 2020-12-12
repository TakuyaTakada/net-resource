/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SearchDeviceInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetDevicesForRack
// ====================================================

export interface GetDevicesForRack_getDevices_deviceModel {
  __typename: "DeviceModel";
  id: string;
  name: string;
  height: number;
  width: number;
}

export interface GetDevicesForRack_getDevices_rack {
  __typename: "Rack";
  id: string;
}

export interface GetDevicesForRack_getDevices {
  __typename: "Device";
  id: string;
  name: string;
  position: number | null;
  deviceModel: GetDevicesForRack_getDevices_deviceModel;
  rack: GetDevicesForRack_getDevices_rack | null;
}

export interface GetDevicesForRack {
  getDevices: GetDevicesForRack_getDevices[];
}

export interface GetDevicesForRackVariables {
  input: SearchDeviceInput;
}

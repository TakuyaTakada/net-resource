/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SearchPortInput, GetIdInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetPortsAndDevice
// ====================================================

export interface GetPortsAndDevice_getPorts {
  __typename: "Port";
  id: string;
  name: string;
  status: number;
  note: string | null;
}

export interface GetPortsAndDevice_getDevice_deviceModel {
  __typename: "DeviceModel";
  id: string;
  name: string;
}

export interface GetPortsAndDevice_getDevice_host {
  __typename: "Host";
  id: string;
  name: string;
}

export interface GetPortsAndDevice_getDevice {
  __typename: "Device";
  id: string;
  name: string;
  status: number;
  deviceModel: GetPortsAndDevice_getDevice_deviceModel;
  host: GetPortsAndDevice_getDevice_host | null;
}

export interface GetPortsAndDevice {
  getPorts: GetPortsAndDevice_getPorts[];
  getDevice: GetPortsAndDevice_getDevice;
}

export interface GetPortsAndDeviceVariables {
  portInput: SearchPortInput;
  deviceInput: GetIdInput;
}

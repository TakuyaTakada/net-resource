/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GetIdInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetRack
// ====================================================

export interface GetRack_getRack_site {
  __typename: "Site";
  id: string;
  name: string;
}

export interface GetRack_getRack_devices_deviceModel {
  __typename: "DeviceModel";
  id: string;
  name: string;
  height: number;
  width: number;
}

export interface GetRack_getRack_devices_rack {
  __typename: "Rack";
  id: string;
}

export interface GetRack_getRack_devices {
  __typename: "Device";
  id: string;
  name: string;
  position: number | null;
  deviceModel: GetRack_getRack_devices_deviceModel;
  rack: GetRack_getRack_devices_rack | null;
}

export interface GetRack_getRack {
  __typename: "Rack";
  id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  status: number;
  units: number;
  site: GetRack_getRack_site | null;
  devices: (GetRack_getRack_devices | null)[] | null;
  note: string | null;
}

export interface GetRack {
  getRack: GetRack_getRack;
}

export interface GetRackVariables {
  input: GetIdInput;
}

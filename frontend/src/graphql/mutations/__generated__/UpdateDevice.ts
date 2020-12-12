/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateDeviceInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateDevice
// ====================================================

export interface UpdateDevice_updateDevice_rack {
  __typename: "Rack";
  id: string;
  name: string;
}

export interface UpdateDevice_updateDevice_deviceModel {
  __typename: "DeviceModel";
  id: string;
  name: string;
}

export interface UpdateDevice_updateDevice_host {
  __typename: "Host";
  id: string;
  name: string;
}

export interface UpdateDevice_updateDevice {
  __typename: "Device";
  id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  status: number;
  position: number | null;
  note: string | null;
  rack: UpdateDevice_updateDevice_rack | null;
  deviceModel: UpdateDevice_updateDevice_deviceModel;
  host: UpdateDevice_updateDevice_host | null;
}

export interface UpdateDevice {
  updateDevice: UpdateDevice_updateDevice;
}

export interface UpdateDeviceVariables {
  input: UpdateDeviceInput;
}

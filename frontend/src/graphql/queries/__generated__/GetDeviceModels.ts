/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SearchDeviceModelInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetDeviceModels
// ====================================================

export interface GetDeviceModels_getDeviceModels {
  __typename: "DeviceModel";
  id: string;
  updatedAt: any;
  name: string;
  height: number;
}

export interface GetDeviceModels {
  getDeviceModels: GetDeviceModels_getDeviceModels[];
}

export interface GetDeviceModelsVariables {
  input: SearchDeviceModelInput;
}

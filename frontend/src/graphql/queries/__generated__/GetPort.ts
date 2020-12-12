/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GetIdInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetPort
// ====================================================

export interface GetPort_getPort_device {
  __typename: "Device";
  id: string;
  name: string;
}

export interface GetPort_getPort {
  __typename: "Port";
  id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  status: number;
  note: string | null;
  device: GetPort_getPort_device;
}

export interface GetPort {
  getPort: GetPort_getPort;
}

export interface GetPortVariables {
  input: GetIdInput;
}

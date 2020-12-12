/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdatePortInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdatePort
// ====================================================

export interface UpdatePort_updatePort_device {
  __typename: "Device";
  id: string;
  name: string;
}

export interface UpdatePort_updatePort {
  __typename: "Port";
  id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  status: number;
  note: string | null;
  device: UpdatePort_updatePort_device;
}

export interface UpdatePort {
  updatePort: UpdatePort_updatePort;
}

export interface UpdatePortVariables {
  input: UpdatePortInput;
}

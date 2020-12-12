/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { BulkCreatePortInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: BulkCreatePort
// ====================================================

export interface BulkCreatePort_bulkCreatePort_device {
  __typename: "Device";
  id: string;
  name: string;
}

export interface BulkCreatePort_bulkCreatePort {
  __typename: "Port";
  id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  status: number;
  note: string | null;
  device: BulkCreatePort_bulkCreatePort_device;
}

export interface BulkCreatePort {
  bulkCreatePort: BulkCreatePort_bulkCreatePort[];
}

export interface BulkCreatePortVariables {
  input: BulkCreatePortInput;
}

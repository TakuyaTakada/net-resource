/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { BulkIdInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: BulkDeleteIpSegment
// ====================================================

export interface BulkDeleteIpSegment_bulkDeleteIpSegment {
  __typename: "IpSegment";
  id: string;
  ipSegment: any;
}

export interface BulkDeleteIpSegment {
  bulkDeleteIpSegment: BulkDeleteIpSegment_bulkDeleteIpSegment[];
}

export interface BulkDeleteIpSegmentVariables {
  input: BulkIdInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GetIdInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetSegmentUse
// ====================================================

export interface GetSegmentUse_getSegmentUse_ipSegments {
  __typename: "IpSegment";
  id: string;
  ipSegment: any;
}

export interface GetSegmentUse_getSegmentUse {
  __typename: "SegmentUse";
  id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  note: string | null;
  ipSegments: (GetSegmentUse_getSegmentUse_ipSegments | null)[] | null;
}

export interface GetSegmentUse {
  getSegmentUse: GetSegmentUse_getSegmentUse;
}

export interface GetSegmentUseVariables {
  input: GetIdInput;
}

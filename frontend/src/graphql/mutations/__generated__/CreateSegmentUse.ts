/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateSegmentUseInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateSegmentUse
// ====================================================

export interface CreateSegmentUse_createSegmentUse_ipSegments {
  __typename: "IpSegment";
  id: string;
  ipSegment: any;
}

export interface CreateSegmentUse_createSegmentUse {
  __typename: "SegmentUse";
  id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  note: string | null;
  ipSegments: (CreateSegmentUse_createSegmentUse_ipSegments | null)[] | null;
}

export interface CreateSegmentUse {
  createSegmentUse: CreateSegmentUse_createSegmentUse;
}

export interface CreateSegmentUseVariables {
  input: CreateSegmentUseInput;
}

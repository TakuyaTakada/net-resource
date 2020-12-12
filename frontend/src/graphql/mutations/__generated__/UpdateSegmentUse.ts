/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UpdateSegmentUseInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateSegmentUse
// ====================================================

export interface UpdateSegmentUse_updateSegmentUse_ipSegments {
  __typename: "IpSegment";
  id: string;
  ipSegment: any;
}

export interface UpdateSegmentUse_updateSegmentUse {
  __typename: "SegmentUse";
  id: string;
  createdAt: any;
  updatedAt: any;
  name: string;
  note: string | null;
  ipSegments: (UpdateSegmentUse_updateSegmentUse_ipSegments | null)[] | null;
}

export interface UpdateSegmentUse {
  updateSegmentUse: UpdateSegmentUse_updateSegmentUse;
}

export interface UpdateSegmentUseVariables {
  input: UpdateSegmentUseInput;
}

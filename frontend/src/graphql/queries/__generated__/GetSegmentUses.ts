/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SearchSegmentUseInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetSegmentUses
// ====================================================

export interface GetSegmentUses_getSegmentUses {
  __typename: "SegmentUse";
  id: string;
  updatedAt: any;
  name: string;
}

export interface GetSegmentUses {
  getSegmentUses: GetSegmentUses_getSegmentUses[];
}

export interface GetSegmentUsesVariables {
  input: SearchSegmentUseInput;
}

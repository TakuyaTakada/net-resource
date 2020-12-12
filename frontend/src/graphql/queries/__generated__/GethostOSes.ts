/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SearchHostOSInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GethostOSes
// ====================================================

export interface GethostOSes_getHostOSes {
  __typename: "HostOS";
  id: string;
  updatedAt: any;
  name: string;
}

export interface GethostOSes {
  getHostOSes: GethostOSes_getHostOSes[];
}

export interface GethostOSesVariables {
  input: SearchHostOSInput;
}

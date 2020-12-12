/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface BulkCreatePortInput {
  prefix: string;
  startNum: number;
  endNum: number;
  status: number;
  deviceId: string;
}

export interface BulkIdInput {
  ids: string[];
}

export interface BulkUpdateDeviceInput {
  devices?: (UpdateDeviceInput | null)[] | null;
}

export interface CreateDeviceInput {
  name: string;
  status: number;
  position?: number | null;
  rackId?: string | null;
  deviceModelId: string;
  hostId?: string | null;
  note?: string | null;
}

export interface CreateDeviceModelInput {
  name: string;
  height: number;
  width: number;
  note?: string | null;
}

export interface CreateHostInput {
  name: string;
  status: number;
  deviceIds?: (string | null)[] | null;
  mgmtIpId?: string | null;
  hostOSId?: string | null;
  protocol?: number | null;
  note?: string | null;
}

export interface CreateHostOSInput {
  name: string;
  hostIds?: (string | null)[] | null;
  note?: string | null;
}

export interface CreateIpSegmentInput {
  ipSegment: any;
  vrfId?: string | null;
  useId?: string | null;
  note?: string | null;
}

export interface CreateRackInput {
  name: string;
  status: number;
  siteId?: string | null;
  units: number;
  note?: string | null;
}

export interface CreateSegmentUseInput {
  name: string;
  note?: string | null;
}

export interface CreateSiteInput {
  name: string;
  status: number;
  postalCode?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  note?: string | null;
}

export interface CreateVrfInput {
  name: string;
  note?: string | null;
}

export interface GetIdInput {
  id: string;
}

export interface SearchDeviceInput {
  name?: string | null;
  status?: number | null;
  siteId?: string | null;
  rackId?: string | null;
  deviceModelId?: string | null;
  hostId?: string | null;
  hostIdOr?: string | null;
  hostIdIsNull?: boolean | null;
  positionIsNull?: boolean | null;
  rackIdOrNull?: string | null;
}

export interface SearchDeviceModelInput {
  name?: string | null;
}

export interface SearchHostInput {
  name?: string | null;
  status?: number | null;
  hostOSId?: string | null;
  hostOSIdOr?: string | null;
  hostOSIsNull?: boolean | null;
  siteId?: string | null;
  rackId?: string | null;
}

export interface SearchHostOSInput {
  name?: string | null;
}

export interface SearchIpSegmentInput {
  ipSegment?: any | null;
  vrfId?: string | null;
  useId?: string | null;
}

export interface SearchIpaddrInput {
  ip?: any | null;
  status?: number | null;
  type?: number | null;
  hostId?: string | null;
  ipSegmentId?: string | null;
}

export interface SearchPortInput {
  id?: string | null;
  name?: string | null;
  status?: number | null;
  deviceId?: string | null;
}

export interface SearchRackInput {
  name?: string | null;
  status?: number | null;
  siteName?: string | null;
  siteId?: string | null;
}

export interface SearchSegmentUseInput {
  name?: string | null;
}

export interface SearchSiteInput {
  name?: string | null;
  status?: number | null;
}

export interface SearchVrfInput {
  name?: string | null;
}

export interface UpdateDeviceInput {
  id: string;
  name?: string | null;
  status?: number | null;
  position?: number | null;
  rackId?: string | null;
  deviceModelId?: string | null;
  hostId?: string | null;
  note?: string | null;
}

export interface UpdateDeviceModelInput {
  id: string;
  name?: string | null;
  height?: number | null;
  width?: number | null;
  note?: string | null;
}

export interface UpdateHostInput {
  id: string;
  name?: string | null;
  status?: number | null;
  deviceIds?: (string | null)[] | null;
  mgmtIpId?: string | null;
  hostOSId?: string | null;
  protocol?: number | null;
  note?: string | null;
}

export interface UpdateHostOSInput {
  id: string;
  name?: string | null;
  hostIds?: (string | null)[] | null;
  note?: string | null;
}

export interface UpdateIpSegmentInput {
  id: string;
  vrfId?: string | null;
  useId?: string | null;
  note?: string | null;
}

export interface UpdateIpaddrInput {
  id: string;
  status?: number | null;
  type?: number | null;
  note?: string | null;
}

export interface UpdatePortInput {
  id: string;
  name?: string | null;
  status?: number | null;
  deviceId?: string | null;
  note?: string | null;
}

export interface UpdateRackInput {
  id: string;
  name?: string | null;
  status?: number | null;
  siteId?: string | null;
  units?: number | null;
  note?: string | null;
}

export interface UpdateSegmentUseInput {
  id: string;
  name?: string | null;
  note?: string | null;
}

export interface UpdateSiteInput {
  id: string;
  name?: string | null;
  status?: number | null;
  postalCode?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  note?: string | null;
}

export interface UpdateVrfInput {
  id: string;
  name?: string | null;
  note?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================

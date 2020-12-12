export type TranslateType = { value: number; text: string }[];
export const SITE_STATUSES: TranslateType = [
  {
    value: 1,
    text: "Active"
  },
  {
    value: 2,
    text: "Planned"
  },
  {
    value: 3,
    text: "Retired"
  }
];

export const RACK_STATUSES: TranslateType = [
  {
    value: 1,
    text: "Available"
  },
  {
    value: 2,
    text: "Planned"
  },
  {
    value: 3,
    text: "Deprecated"
  }
];

export const DEVICE_STATUSES: TranslateType = [
  {
    value: 1,
    text: "In Use"
  },
  {
    value: 2,
    text: "Planned"
  },
  {
    value: 3,
    text: "Unavailable"
  }
];

export const HOST_STATUSES: TranslateType = [
  {
    value: 1,
    text: "Available"
  },
  {
    value: 2,
    text: "Alert"
  },
  {
    value: 3,
    text: "Unavailable"
  }
];

export const IPADDR_TYPE: TranslateType = [
  {
    value: 1,
    text: "NW Address"
  },
  {
    value: 2,
    text: "Broadcast"
  },
  {
    value: 3,
    text: "Host"
  }
];

export const IPADDR_STATUSES: TranslateType = [
  {
    value: 1,
    text: "Available"
  },
  {
    value: 2,
    text: "Unavailable"
  },
  {
    value: 3,
    text: "In use"
  },
  {
    value: 4,
    text: "Reserved"
  }
];

export const PORT_STATUSES: TranslateType = [
  {
    value: 1,
    text: "Enable"
  },
  {
    value: 2,
    text: "Disable"
  }
];

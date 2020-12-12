import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ApartmentIcon from "@material-ui/icons/Apartment";
import StorageIcon from "@material-ui/icons/Storage";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import Home from "./components/Home/Home";
import Site from "./components/Site/Site";
import Rack from "./components/Rack/Rack";
import Model from "./components/Model/Model";
import Device from "./components/Device/Device";
import HostOS from "./components/HostOS/HostOS";
import Host from "./components/Host/Host";
import IpSegment from "./components/IpSegment/IpSegment";
import Ipaddr from "./components/IpSegment/Ipaddr/Ipaddr";
import SegmentUse from "./components/SegmentUse/SegmentUse";
import Vrf from "./components/Vrf/Vrf";
import RackDetail from "./components/Rack/RackDetail/RackDetail";
import DeviceDetail from "./components/Device/DeviceDetail/DeviceDetail";

export type routeType = {
  name: string;
  path: string;
  exact: boolean;
  staffOnly: boolean;
  component: JSX.Element;
  sidebarIcon?: JSX.Element;
  nestedItem?: {
    name: string;
    path: string;
    exact: boolean;
    staffOnly: boolean;
    component: JSX.Element;
  }[];
};

const routes: routeType[] = [
  {
    name: "Home",
    path: "/",
    exact: true,
    staffOnly: false,
    component: <Home />,
    sidebarIcon: <DashboardIcon />
  },
  {
    name: "Site",
    path: "/site",
    exact: true,
    staffOnly: false,
    component: <Site />,
    sidebarIcon: <ApartmentIcon />
  },
  {
    name: "Rack",
    path: "/rack",
    exact: true,
    staffOnly: false,
    component: <Rack />,
    sidebarIcon: <StorageIcon />
  },
  {
    name: "Devices/Hosts",
    path: "/",
    exact: false,
    staffOnly: false,
    component: <div />,
    sidebarIcon: <DynamicFeedIcon />,
    nestedItem: [
      {
        name: "Model",
        path: "/model",
        exact: true,
        staffOnly: false,
        component: <Model />
      },
      {
        name: "Device",
        path: "/device",
        exact: true,
        staffOnly: false,
        component: <Device />
      },
      {
        name: "OS",
        path: "/os",
        exact: true,
        staffOnly: false,
        component: <HostOS />
      },
      {
        name: "Host",
        path: "/host",
        exact: true,
        staffOnly: false,
        component: <Host />
      }
    ]
  },
  {
    name: "IPAM",
    path: "/ipam",
    exact: true,
    staffOnly: false,
    component: <div />,
    sidebarIcon: <ImportContactsIcon />,
    nestedItem: [
      {
        name: "Segment",
        path: "/ipam/segment",
        exact: true,
        staffOnly: false,
        component: <IpSegment />
      },
      {
        name: "Segment Use",
        path: "/ipam/useseg",
        exact: true,
        staffOnly: false,
        component: <SegmentUse />
      },
      {
        name: "VRF",
        path: "/ipam/vrf",
        exact: true,
        staffOnly: false,
        component: <Vrf />
      }
    ]
  },
  {
    name: "IP Address",
    path: "/ipam/segment/:id",
    exact: true,
    staffOnly: false,
    component: <Ipaddr />
  },
  {
    name: "Rack Detail",
    path: "/rack/:id",
    exact: true,
    staffOnly: false,
    component: <RackDetail />
  },
  {
    name: "Device Detail",
    path: "/device/:id",
    exact: true,
    staffOnly: false,
    component: <DeviceDetail />
  }
];

export default routes;

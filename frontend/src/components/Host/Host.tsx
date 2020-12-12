import React, { useState } from "react";
import {
  gqlInput,
  headCellsType,
  DialogFields,
  SearchFieldType
} from "../../types";
import { GetHosts_getHosts } from "../../graphql/queries/__generated__/GetHosts";
import { GetHost } from "../../graphql/queries/__generated__/GetHost";
import { GetRacks_getRacks } from "../../graphql/queries/__generated__/GetRacks";
import { GetSites_getSites } from "../../graphql/queries/__generated__/GetSites";
import { GetIpaddrs_getIpaddrs } from "../../graphql/queries/__generated__/GetIpaddrs";
import { GethostOSes_getHostOSes } from "../../graphql/queries/__generated__/GethostOSes";
import { GetDevices_getDevices } from "../../graphql/queries/__generated__/GetDevices";
import {
  CreateHostInput,
  UpdateHostInput
} from "../../../__generated__/globalTypes";
import {
  HOST_DETAIL_QUERY,
  HOST_LIST_QUERY
} from "../../graphql/queries/hostQueries";
import { RACK_LIST_QUERY } from "../../graphql/queries/rackQueries";
import { SITE_LIST_QUERY } from "../../graphql/queries/siteQueries";
import { IPADDR_LIST_QUERY } from "../../graphql/queries/ipaddrQueries";
import { OS_LIST_QUERY } from "../../graphql/queries/osQueries";
import { DEVICE_LIST_QUERY } from "../../graphql/queries/deviceQueries";
import {
  HOST_BULK_DELETE_MUTATION,
  HOST_CREATE_MUTATION,
  HOST_UPDATE_MUTATION
} from "../../graphql/mutations/hostMutations";
import { HOST_STATUSES } from "../../const";
import ListTable from "../ListTable/ListTable";
import AddButton from "../AddButton/AddButton";
import CreateDialog from "../CreateDialog/CreateDialog";
import UpdateDialog from "../UpdateDialog/UpdateDialog";
import BulkDeleteDialog from "../BulkDeleteDialog/BulkDeleteDialog";

const headCells: headCellsType = [
  { id: "name", numeric: false, disablePadding: false, label: "Device" },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
    translate: HOST_STATUSES
  },
  {
    id: "mgmtIp",
    nestId: "ip",
    numeric: false,
    disablePadding: false,
    label: "IP"
  },
  {
    id: "updatedAt",
    numeric: false,
    disablePadding: false,
    label: "Updated at"
  }
];

const Host: React.FC = (): JSX.Element => {
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState("");
  // search state
  const [searchName, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState(0);
  const [searchSiteId, setSearchSiteId] = useState("");
  const [searchRackId, setSearchRackId] = useState("");
  const [searchHostOSId, setSearchHostOSId] = useState("");
  const [searchInput, setSearchInput] = useState<gqlInput>({ input: {} });
  // create dialog state
  const [createOpen, setCreateOpen] = useState(false);
  const initialCreateInput = {
    name: "",
    status: 1,
    deviceIds: [],
    mgmtIpId: "",
    hostOSId: "",
    protocol: 22,
    note: ""
  };
  const [createInput, setCreateInput] = useState<{ input: CreateHostInput }>({
    input: initialCreateInput
  });
  // update dialog state
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateInput, setUpdateInput] = useState<{ input: UpdateHostInput }>({
    input: {
      id: "",
      name: "",
      status: 0,
      deviceIds: [],
      mgmtIpId: "",
      hostOSId: "",
      protocol: 22,
      note: ""
    }
  });
  // delete dialog state
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

  const handleCreateOpen = () => {
    setSelectedId("");
    setCreateOpen(true);
  };

  const handleCreateClose = () => {
    setCreateOpen(false);
  };

  const handleCreateInput = (input: { input: CreateHostInput }) => {
    setCreateInput(input);
  };

  const handleCreateDisabled = (params: any) => {
    return !(params.name !== "" && params.status !== 0);
  };

  const handleUpdateOpen = (id: string) => {
    setSelectedId(id);
    setUpdateOpen(true);
  };

  const handleUpdateInput = (input: { input: UpdateHostInput }) => {
    setUpdateInput(input);
  };

  const handleSetUpdateParams = (data: GetHost) => {
    return {
      id: data.getHost.id,
      name: data.getHost.name,
      status: data.getHost.status,
      deviceIds: data.getHost.devices
        ? data.getHost.devices.map(d => (d ? d.id : null))
        : [],
      mgmtIpId: data.getHost.mgmtIp ? data.getHost.mgmtIp.id : "",
      hostOSId: data.getHost.hostOS ? data.getHost.hostOS.id : "",
      protocol: data.getHost.protocol,
      note: data.getHost.note
    };
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  const handleUpdateDisabled = (params: any) => {
    return !(params.id !== "" && params.name !== "" && params.status !== 0);
  };

  const handleBulkDeleteOpen = () => {
    setBulkDeleteOpen(true);
  };

  const handleBulkDeleteClose = () => {
    setBulkDeleteOpen(false);
  };

  const handleFilter = () => {
    setSearchInput({
      input: {
        name: searchName,
        siteId: searchSiteId,
        rackId: searchRackId,
        hostOSId: searchHostOSId,
        status: searchStatus
      }
    });
  };

  const handleSearchName = (event: Event, value: string) => {
    setSearchName(value);
  };

  const initSelected = () => setSelected([]);
  const getSelected = () => selected;

  const dialogFields: DialogFields = [
    {
      name: "status",
      label: "Status",
      transList: HOST_STATUSES
    },
    {
      name: "name",
      label: "Name",
      required: true,
      multiline: false
    },
    {
      name: "protocol",
      label: "Protocol",
      multiline: false
    },
    {
      name: "mgmtIpId",
      blankText: "---- Choose ip ----",
      query: IPADDR_LIST_QUERY,
      variables: { input: { status: 1, type: 3, hostId: selectedId } },
      typename: "getIpaddrs",
      accessors: {
        value: (d: GetIpaddrs_getIpaddrs) => d.id,
        text: (d: GetIpaddrs_getIpaddrs) => d.ip
      }
    },
    {
      name: "hostOSId",
      blankText: "---- Choose OS ----",
      query: OS_LIST_QUERY,
      variables: { input: {} },
      typename: "getHostOSes",
      accessors: {
        value: (d: GethostOSes_getHostOSes) => d.id,
        text: (d: GethostOSes_getHostOSes) => d.name
      }
    },
    {
      title: "Select devices",
      checkedName: "deviceIds",
      query: DEVICE_LIST_QUERY,
      variables: { input: { hostIdOr: selectedId, hostIdIsNull: true } },
      typename: "getDevices",
      accessors: {
        value: (d: GetDevices_getDevices) => d.id,
        text: (d: GetDevices_getDevices) => d.name
      }
    },
    {
      name: "note",
      label: "Note",
      multiline: true,
      rows: 3
    }
  ];

  const searchField: SearchFieldType = [
    {
      name: "siteId",
      blankText: "-- Site --",
      query: SITE_LIST_QUERY,
      variables: { input: {} },
      typename: "getSites",
      value: searchSiteId,
      accessors: {
        value: (d: GetSites_getSites) => d.id,
        text: (d: GetSites_getSites) => d.name
      },
      handleChange: setSearchSiteId
    },
    {
      name: "rackId",
      blankText: "-- Rack --",
      query: RACK_LIST_QUERY,
      variables: { input: { siteId: searchSiteId } },
      typename: "getRacks",
      value: searchRackId,
      accessors: {
        value: (d: GetRacks_getRacks) => d.id,
        text: (d: GetRacks_getRacks) => d.name
      },
      handleChange: setSearchRackId
    },
    {
      name: "hostOSId",
      blankText: "-- OS --",
      query: OS_LIST_QUERY,
      variables: { input: {} },
      typename: "getHostOSes",
      value: searchHostOSId,
      accessors: {
        value: (d: GethostOSes_getHostOSes) => d.id,
        text: (d: GethostOSes_getHostOSes) => d.name
      },
      handleChange: setSearchHostOSId
    },
    {
      label: "Name",
      query: HOST_LIST_QUERY,
      variables: { input: {} },
      typename: "getHosts",
      value: searchName,
      accessor: (d: GetHosts_getHosts) => d.name,
      handleChange: setSearchName,
      handleAutoComplete: handleSearchName
    },
    {
      name: "status",
      blankText: "-- Status --",
      transList: HOST_STATUSES,
      value: searchStatus,
      handleChange: setSearchStatus
    }
  ];

  return (
    <>
      <ListTable
        title="Host List"
        query={HOST_LIST_QUERY}
        typename="getHosts"
        headCells={headCells}
        handleFilter={handleFilter}
        handleUpdateOpen={handleUpdateOpen}
        handleBulkDeleteOpen={handleBulkDeleteOpen}
        searchInput={searchInput}
        selected={selected}
        setSelected={setSelected}
        searchField={searchField}
        orderByCol="updatedAt"
      />
      <AddButton handleCreateOpen={handleCreateOpen} />
      <CreateDialog
        createOpen={createOpen}
        handleCreateClose={handleCreateClose}
        createMutation={HOST_CREATE_MUTATION}
        createMutationInput={createInput}
        handleCreateInput={handleCreateInput}
        listQuery={HOST_LIST_QUERY}
        searchInput={searchInput}
        handleCreateDisabled={handleCreateDisabled}
        initialCreateInput={initialCreateInput}
        fields={dialogFields}
      />
      <UpdateDialog
        id={selectedId}
        updateOpen={updateOpen}
        handleUpdateClose={handleUpdateClose}
        updateMutation={HOST_UPDATE_MUTATION}
        updateMutationInput={updateInput}
        handleSetParams={handleSetUpdateParams}
        handleUpdateInput={handleUpdateInput}
        updateTypename="updateHost"
        handleUpdateDisabled={handleUpdateDisabled}
        detailQuery={HOST_DETAIL_QUERY}
        detailTypename="getHost"
        fields={dialogFields}
      />
      <BulkDeleteDialog
        getSelected={getSelected}
        bulkDeleteOpen={bulkDeleteOpen}
        handleBulkDeleteClose={handleBulkDeleteClose}
        deleteMutation={HOST_BULK_DELETE_MUTATION}
        listQuery={HOST_LIST_QUERY}
        initSelected={initSelected}
        searchInput={searchInput}
      />
    </>
  );
};

export default Host;

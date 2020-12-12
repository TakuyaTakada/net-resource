import React, { useState } from "react";
import {
  gqlInput,
  headCellsType,
  DialogFields,
  SearchFieldType
} from "../../types";
import { GetDevices_getDevices } from "../../graphql/queries/__generated__/GetDevices";
import { GetDeviceModels_getDeviceModels } from "../../graphql/queries/__generated__/GetDeviceModels";
import { GetHosts_getHosts } from "../../graphql/queries/__generated__/GetHosts";
import { GetSites_getSites } from "../../graphql/queries/__generated__/GetSites";
import { GetRacks_getRacks } from "../../graphql/queries/__generated__/GetRacks";
import { GetDevice } from "../../graphql/queries/__generated__/GetDevice";
import {
  CreateDeviceInput,
  UpdateDeviceInput
} from "../../../__generated__/globalTypes";
import {
  DEVICE_DETAIL_QUERY,
  DEVICE_LIST_QUERY
} from "../../graphql/queries/deviceQueries";
import { SITE_LIST_QUERY } from "../../graphql/queries/siteQueries";
import { RACK_LIST_QUERY } from "../../graphql/queries/rackQueries";
import { MODEL_LIST_QUERY } from "../../graphql/queries/modelQueries";
import { HOST_LIST_QUERY } from "../../graphql/queries/hostQueries";
import {
  DEVICE_BULK_DELETE_MUTATION,
  DEVICE_CREATE_MUTATION,
  DEVICE_UPDATE_MUTATION
} from "../../graphql/mutations/deviceMutations";
import { DEVICE_STATUSES } from "../../const";
import ListTable from "../ListTable/ListTable";
import AddButton from "../AddButton/AddButton";
import CreateDialog from "../CreateDialog/CreateDialog";
import UpdateDialog from "../UpdateDialog/UpdateDialog";
import BulkDeleteDialog from "../BulkDeleteDialog/BulkDeleteDialog";

const headCells: headCellsType = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Device",
    link: "/device/"
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
    translate: DEVICE_STATUSES
  },
  {
    id: "updatedAt",
    numeric: false,
    disablePadding: false,
    label: "Updated at"
  }
];

const Device: React.FC = (): JSX.Element => {
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState("");
  // search state
  const [searchName, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState<number>(0);
  const [searchSiteName, setSearchSiteName] = useState("");
  const [searchRackId, setSearchRackId] = useState("");
  const [searchModelId, setSearchModelId] = useState("");
  const [searchHostId, setSearchHostId] = useState("");
  const [searchInput, setSearchInput] = useState<gqlInput>({ input: {} });
  // create dialog state
  const [createOpen, setCreateOpen] = useState(false);
  const initialCreateInput = {
    name: "",
    status: 2,
    position: 0,
    deviceModelId: "",
    rackId: "",
    hostId: "",
    note: ""
  };
  const [createInput, setCreateInput] = useState<{ input: CreateDeviceInput }>({
    input: initialCreateInput
  });
  // update dialog state
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateInput, setUpdateInput] = useState<{ input: UpdateDeviceInput }>({
    input: {
      id: "",
      name: "",
      status: 0,
      position: 0,
      deviceModelId: "",
      rackId: "",
      hostId: "",
      note: ""
    }
  });
  // delete dialog state
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

  const handleCreateOpen = () => {
    setCreateOpen(true);
  };

  const handleCreateClose = () => {
    setCreateOpen(false);
  };

  const handleCreateInput = (input: { input: CreateDeviceInput }) => {
    setCreateInput(input);
  };

  const handleCreateDisabled = (params: any) => {
    return !(
      params.name !== "" &&
      params.status !== 0 &&
      params.deviceModelId !== ""
    );
  };

  const handleUpdateOpen = (id: string) => {
    setSelectedId(id);
    setUpdateOpen(true);
  };

  const handleUpdateInput = (input: { input: UpdateDeviceInput }) => {
    setUpdateInput(input);
  };

  const handleSetUpdateParams = (data: GetDevice) => {
    return {
      id: data.getDevice.id,
      name: data.getDevice.name,
      status: data.getDevice.status,
      position: data.getDevice.position ? data.getDevice.position : 0,
      deviceModelId: data.getDevice.deviceModel.id,
      rackId: data.getDevice.rack ? data.getDevice.rack.id : "",
      hostId: data.getDevice.host ? data.getDevice.host.id : "",
      note: data.getDevice.note
    };
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  const handleUpdateDisabled = (params: any) => {
    return !(
      params.id !== "" &&
      params.name !== "" &&
      params.status !== 0 &&
      params.deviceModelId !== 0
    );
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
        rackId: searchRackId,
        deviceModelId: searchModelId,
        hostId: searchHostId,
        status: searchStatus
      }
    });
  };

  const handleSearchName = (event: Event, value: string) => {
    setSearchName(value);
  };

  const handleSearchSiteName = (event: Event, value: string) => {
    setSearchSiteName(value);
  };

  const initSelected = () => setSelected([]);
  const getSelected = () => selected;

  const dialogFields: DialogFields = [
    {
      name: "status",
      label: "Status",
      transList: DEVICE_STATUSES
    },
    {
      name: "name",
      label: "Name",
      required: true,
      multiline: false
    },
    {
      name: "deviceModelId",
      blankText: "---- Choose model ----",
      query: MODEL_LIST_QUERY,
      variables: { input: {} },
      typename: "getDeviceModels",
      accessors: {
        value: (d: GetDeviceModels_getDeviceModels) => d.id,
        text: (d: GetDeviceModels_getDeviceModels) => d.name
      }
    },
    {
      name: "rackId",
      blankText: "---- Choose rack ----",
      query: RACK_LIST_QUERY,
      variables: { input: {} },
      typename: "getRacks",
      accessors: {
        value: (d: GetRacks_getRacks) => d.id,
        text: (d: GetRacks_getRacks) =>
          d.site ? `${d.name} (${d.site.name})` : d.name
      }
    },
    {
      name: "position",
      label: "Mount Position",
      required: false,
      multiline: false
    },
    {
      name: "hostId",
      blankText: "---- Choose host ----",
      query: HOST_LIST_QUERY,
      variables: { input: {} },
      typename: "getHosts",
      accessors: {
        value: (d: GetHosts_getHosts) => d.id,
        text: (d: GetHosts_getHosts) => d.name
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
      label: "Site",
      query: SITE_LIST_QUERY,
      variables: { input: {} },
      typename: "getSites",
      value: searchSiteName,
      accessor: (d: GetSites_getSites) => d.name,
      handleChange: setSearchSiteName,
      handleAutoComplete: handleSearchSiteName
    },
    {
      name: "rackId",
      blankText: "-- Rack --",
      query: RACK_LIST_QUERY,
      variables: { input: { siteName: searchSiteName } },
      typename: "getRacks",
      value: searchRackId,
      accessors: {
        value: (d: GetRacks_getRacks) => d.id,
        text: (d: GetRacks_getRacks) => d.name
      },
      handleChange: setSearchRackId
    },
    {
      name: "deviceModelId",
      blankText: "-- Model --",
      query: MODEL_LIST_QUERY,
      variables: { input: {} },
      typename: "getDeviceModels",
      value: searchModelId,
      accessors: {
        value: (d: GetDeviceModels_getDeviceModels) => d.id,
        text: (d: GetDeviceModels_getDeviceModels) => d.name
      },
      handleChange: setSearchModelId
    },
    {
      name: "hostId",
      blankText: "-- Host --",
      query: HOST_LIST_QUERY,
      variables: { input: {} },
      typename: "getHosts",
      value: searchHostId,
      accessors: {
        value: (d: GetHosts_getHosts) => d.id,
        text: (d: GetHosts_getHosts) => d.name
      },
      handleChange: setSearchHostId
    },
    {
      label: "Name",
      query: DEVICE_LIST_QUERY,
      variables: { input: {} },
      typename: "getDevices",
      value: searchName,
      accessor: (d: GetDevices_getDevices) => d.name,
      handleChange: setSearchName,
      handleAutoComplete: handleSearchName
    },
    {
      name: "status",
      blankText: "-- Status --",
      transList: DEVICE_STATUSES,
      value: searchStatus,
      handleChange: setSearchStatus
    }
  ];

  return (
    <>
      <ListTable
        title="Device List"
        query={DEVICE_LIST_QUERY}
        typename="getDevices"
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
        createMutation={DEVICE_CREATE_MUTATION}
        createMutationInput={createInput}
        handleCreateInput={handleCreateInput}
        listQuery={DEVICE_LIST_QUERY}
        searchInput={searchInput}
        handleCreateDisabled={handleCreateDisabled}
        initialCreateInput={initialCreateInput}
        fields={dialogFields}
      />
      <UpdateDialog
        id={selectedId}
        updateOpen={updateOpen}
        handleUpdateClose={handleUpdateClose}
        updateMutation={DEVICE_UPDATE_MUTATION}
        updateMutationInput={updateInput}
        handleSetParams={handleSetUpdateParams}
        handleUpdateInput={handleUpdateInput}
        updateTypename="updateDevice"
        handleUpdateDisabled={handleUpdateDisabled}
        detailQuery={DEVICE_DETAIL_QUERY}
        detailTypename="getDevice"
        fields={dialogFields}
      />
      <BulkDeleteDialog
        getSelected={getSelected}
        bulkDeleteOpen={bulkDeleteOpen}
        handleBulkDeleteClose={handleBulkDeleteClose}
        deleteMutation={DEVICE_BULK_DELETE_MUTATION}
        listQuery={DEVICE_LIST_QUERY}
        initSelected={initSelected}
        searchInput={searchInput}
      />
    </>
  );
};

export default Device;

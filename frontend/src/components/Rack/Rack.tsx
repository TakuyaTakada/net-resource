import React, { useState } from "react";
import {
  gqlInput,
  headCellsType,
  DialogFields,
  SearchFieldType
} from "../../types";
import { GetRacks_getRacks } from "../../graphql/queries/__generated__/GetRacks";
import {
  CreateRackInput,
  UpdateRackInput
} from "../../../__generated__/globalTypes";
import { GetSites_getSites } from "../../graphql/queries/__generated__/GetSites";
import { GetRack } from "../../graphql/queries/__generated__/GetRack";
import {
  RACK_DETAIL_QUERY,
  RACK_LIST_QUERY
} from "../../graphql/queries/rackQueries";
import { SITE_LIST_QUERY } from "../../graphql/queries/siteQueries";
import {
  RACK_BULK_DELETE_MUTATION,
  RACK_CREATE_MUTATION,
  RACK_UPDATE_MUTATION
} from "../../graphql/mutations/rackMutaions";
import { RACK_STATUSES } from "../../const";
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
    label: "Rack",
    link: "/rack/"
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
    translate: RACK_STATUSES
  },
  {
    id: "updatedAt",
    numeric: false,
    disablePadding: false,
    label: "Updated at"
  }
];

const Rack: React.FC = (): JSX.Element => {
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState("");
  // Search input
  const [searchName, setSearchName] = useState("");
  const [searchSiteName, setSearchSiteName] = useState("");
  const [searchStatus, setSearchStatus] = useState(0);
  const [searchInput, setSearchInput] = useState<gqlInput>({ input: {} });
  // create dialog state
  const [createOpen, setCreateOpen] = useState(false);
  const initialCreateInput: CreateRackInput = {
    name: "",
    status: 2,
    siteId: "",
    units: 42,
    note: ""
  };
  const [createInput, setCreateInput] = useState<{ input: CreateRackInput }>({
    input: initialCreateInput
  });
  // update dialog state
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateInput, setUpdateInput] = useState<{ input: UpdateRackInput }>({
    input: {
      id: "",
      name: "",
      status: 0,
      siteId: "",
      units: 0,
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

  const handleCreateInput = (input: { input: CreateRackInput }) => {
    setCreateInput(input);
  };

  const handleCreateDisabled = (params: any) => {
    return !(params.name !== "" && params.status !== 0 && params.units !== 0);
  };

  const handleUpdateOpen = (id: string) => {
    setSelectedId(id);
    setUpdateOpen(true);
  };

  const handleUpdateInput = (input: { input: UpdateRackInput }) => {
    setUpdateInput(input);
  };

  const handleSetUpdateParams = (data: GetRack) => {
    return {
      id: data.getRack.id,
      name: data.getRack.name,
      status: data.getRack.status,
      siteId: data.getRack.site ? data.getRack.site.id : "",
      units: data.getRack.units,
      note: data.getRack.note
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
      params.units !== 0
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
        siteName: searchSiteName,
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
      transList: RACK_STATUSES
    },
    {
      name: "name",
      label: "Name",
      required: true,
      multiline: false
    },
    {
      name: "units",
      label: "Units",
      multiline: false
    },
    {
      name: "siteId",
      blankText: "---- Choose site ----",
      query: SITE_LIST_QUERY,
      variables: { input: {} },
      typename: "getSites",
      accessors: {
        value: (d: GetSites_getSites) => d.id,
        text: (d: GetSites_getSites) => d.name
      }
    },
    {
      name: "note",
      label: "Note",
      multiline: true,
      rows: 3
    }
  ];

  const searchAutoComp: SearchFieldType = [
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
      label: "Rack",
      query: RACK_LIST_QUERY,
      variables: { input: { siteName: searchSiteName } },
      typename: "getRacks",
      value: searchName,
      accessor: (d: GetRacks_getRacks) => d.name,
      handleChange: setSearchName,
      handleAutoComplete: handleSearchName
    },
    {
      name: "status",
      blankText: "-- Status --",
      transList: RACK_STATUSES,
      value: searchStatus,
      handleChange: setSearchStatus
    }
  ];

  return (
    <>
      <ListTable
        title="Rack List"
        query={RACK_LIST_QUERY}
        typename="getRacks"
        headCells={headCells}
        handleFilter={handleFilter}
        handleUpdateOpen={handleUpdateOpen}
        handleBulkDeleteOpen={handleBulkDeleteOpen}
        searchInput={searchInput}
        selected={selected}
        setSelected={setSelected}
        searchField={searchAutoComp}
        orderByCol="updatedAt"
      />
      <AddButton handleCreateOpen={handleCreateOpen} />
      <CreateDialog
        createOpen={createOpen}
        handleCreateClose={handleCreateClose}
        createMutation={RACK_CREATE_MUTATION}
        createMutationInput={createInput}
        handleCreateInput={handleCreateInput}
        listQuery={RACK_LIST_QUERY}
        searchInput={searchInput}
        handleCreateDisabled={handleCreateDisabled}
        initialCreateInput={initialCreateInput}
        fields={dialogFields}
      />
      <UpdateDialog
        id={selectedId}
        updateOpen={updateOpen}
        handleUpdateClose={handleUpdateClose}
        updateMutation={RACK_UPDATE_MUTATION}
        updateMutationInput={updateInput}
        handleSetParams={handleSetUpdateParams}
        handleUpdateInput={handleUpdateInput}
        updateTypename="updateRack"
        handleUpdateDisabled={handleUpdateDisabled}
        detailQuery={RACK_DETAIL_QUERY}
        detailTypename="getRack"
        fields={dialogFields}
      />
      <BulkDeleteDialog
        getSelected={getSelected}
        bulkDeleteOpen={bulkDeleteOpen}
        handleBulkDeleteClose={handleBulkDeleteClose}
        deleteMutation={RACK_BULK_DELETE_MUTATION}
        listQuery={RACK_LIST_QUERY}
        initSelected={initSelected}
        searchInput={searchInput}
      />
    </>
  );
};

export default Rack;

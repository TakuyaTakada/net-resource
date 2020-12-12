import React, { useState } from "react";
import {
  SITE_DETAIL_QUERY,
  SITE_LIST_QUERY
} from "../../graphql/queries/siteQueries";
import { SITE_STATUSES } from "../../const";
import {
  gqlInput,
  headCellsType,
  DialogFields,
  SearchFieldType
} from "../../types";
import { GetSites_getSites } from "../../graphql/queries/__generated__/GetSites";
import { GetSite } from "../../graphql/queries/__generated__/GetSite";
import {
  SITE_BULK_DELETE_MUTATION,
  SITE_CREATE_MUTATION,
  SITE_UPDATE_MUTATION
} from "../../graphql/mutations/siteMutaions";
import {
  CreateSiteInput,
  UpdateSiteInput
} from "../../../__generated__/globalTypes";
import ListTable from "../ListTable/ListTable";
import AddButton from "../AddButton/AddButton";
import CreateDialog from "../CreateDialog/CreateDialog";
import UpdateDialog from "../UpdateDialog/UpdateDialog";
import BulkDeleteDialog from "../BulkDeleteDialog/BulkDeleteDialog";

const headCells: headCellsType = [
  { id: "name", numeric: false, disablePadding: false, label: "Site" },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
    translate: SITE_STATUSES
  },
  {
    id: "updatedAt",
    numeric: false,
    disablePadding: false,
    label: "Updated at"
  }
];

const Site: React.FC = (): JSX.Element => {
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState("");
  // Search input
  const [searchName, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState(0);
  const [searchInput, setSearchInput] = useState<gqlInput>({ input: {} });
  // create dialog state
  const [createOpen, setCreateOpen] = useState(false);
  const initialCreateInput = {
    name: "",
    status: 2,
    postalCode: "",
    phoneNumber: "",
    address: "",
    note: ""
  };
  const [createInput, setCreateInput] = useState<{ input: CreateSiteInput }>({
    input: initialCreateInput
  });
  // update dialog state
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateInput, setUpdateInput] = useState<{ input: UpdateSiteInput }>({
    input: {
      id: "",
      name: "",
      status: 0,
      postalCode: "",
      phoneNumber: "",
      address: "",
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

  const handleCreateInput = (input: { input: CreateSiteInput }) => {
    setCreateInput(input);
  };

  const handleCreateDisabled = (params: any) => {
    return !(params.name !== "" && params.status !== 0);
  };

  const handleUpdateOpen = (id: string) => {
    setSelectedId(id);
    setUpdateOpen(true);
  };

  const handleUpdateInput = (input: { input: UpdateSiteInput }) => {
    setUpdateInput(input);
  };

  const handleSetUpdateParams = (data: GetSite) => {
    return {
      id: data.getSite.id,
      name: data.getSite.name,
      status: data.getSite.status,
      postalCode: data.getSite.postalCode,
      phoneNumber: data.getSite.phoneNumber,
      address: data.getSite.address,
      note: data.getSite.note
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
    setSearchInput({ input: { name: searchName, status: searchStatus } });
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
      transList: SITE_STATUSES
    },
    {
      name: "name",
      label: "Name",
      required: true,
      multiline: false
    },
    {
      name: "postalCode",
      label: "Postal Code",
      multiline: false
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      multiline: false
    },
    {
      name: "address",
      label: "Address",
      multiline: true,
      rows: 1
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
      label: "Name",
      query: SITE_LIST_QUERY,
      variables: { input: {} },
      typename: "getSites",
      value: searchName,
      accessor: (d: GetSites_getSites) => d.name,
      handleChange: setSearchName,
      handleAutoComplete: handleSearchName
    },
    {
      name: "status",
      blankText: "-- Status --",
      transList: SITE_STATUSES,
      value: searchStatus,
      handleChange: setSearchStatus
    }
  ];

  return (
    <>
      <ListTable
        title="Site List"
        query={SITE_LIST_QUERY}
        typename="getSites"
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
        createMutation={SITE_CREATE_MUTATION}
        createMutationInput={createInput}
        handleCreateInput={handleCreateInput}
        listQuery={SITE_LIST_QUERY}
        searchInput={searchInput}
        handleCreateDisabled={handleCreateDisabled}
        initialCreateInput={initialCreateInput}
        fields={dialogFields}
      />
      <UpdateDialog
        id={selectedId}
        updateOpen={updateOpen}
        handleUpdateClose={handleUpdateClose}
        updateMutation={SITE_UPDATE_MUTATION}
        updateMutationInput={updateInput}
        handleSetParams={handleSetUpdateParams}
        handleUpdateInput={handleUpdateInput}
        updateTypename="updateSite"
        handleUpdateDisabled={handleUpdateDisabled}
        detailQuery={SITE_DETAIL_QUERY}
        detailTypename="getSite"
        fields={dialogFields}
      />
      <BulkDeleteDialog
        getSelected={getSelected}
        bulkDeleteOpen={bulkDeleteOpen}
        handleBulkDeleteClose={handleBulkDeleteClose}
        deleteMutation={SITE_BULK_DELETE_MUTATION}
        listQuery={SITE_LIST_QUERY}
        initSelected={initSelected}
        searchInput={searchInput}
      />
    </>
  );
};

export default Site;

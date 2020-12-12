import React, { useState } from "react";
import {
  gqlInput,
  headCellsType,
  DialogFields,
  SearchFieldType
} from "../../types";
import { GetVrf } from "../../graphql/queries/__generated__/GetVrf";
import {
  CreateVrfInput,
  UpdateVrfInput
} from "../../../__generated__/globalTypes";
import ListTable from "../ListTable/ListTable";
import AddButton from "../AddButton/AddButton";
import CreateDialog from "../CreateDialog/CreateDialog";
import UpdateDialog from "../UpdateDialog/UpdateDialog";
import BulkDeleteDialog from "../BulkDeleteDialog/BulkDeleteDialog";
import { GetVrfs_getVrfs } from "../../graphql/queries/__generated__/GetVrfs";
import {
  VRF_DETAIL_QUERY,
  VRF_LIST_QUERY
} from "../../graphql/queries/vrfQueries";
import {
  VRF_BULK_DELETE_MUTATION,
  VRF_CREATE_MUTATION,
  VRF_UPDATE_MUTATION
} from "../../graphql/mutations/vrfMutations";

const headCells: headCellsType = [
  { id: "name", numeric: false, disablePadding: false, label: "VRF" },
  {
    id: "updatedAt",
    numeric: false,
    disablePadding: false,
    label: "Updated at"
  }
];

const Vrf: React.FC = (): JSX.Element => {
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState("");
  // search state
  const [searchName, setSearchName] = useState("");
  const [searchInput, setSearchInput] = useState<gqlInput>({ input: {} });
  // create dialog state
  const [createOpen, setCreateOpen] = useState(false);
  const initialCreateInput = {
    name: "",
    note: ""
  };
  const [createInput, setCreateInput] = useState<{ input: CreateVrfInput }>({
    input: initialCreateInput
  });
  // update dialog state
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateInput, setUpdateInput] = useState<{ input: UpdateVrfInput }>({
    input: {
      id: "",
      name: "",
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

  const handleCreateInput = (input: { input: CreateVrfInput }) => {
    setCreateInput(input);
  };

  const handleCreateDisabled = (params: any) => {
    return !(params.name !== "");
  };

  const handleUpdateOpen = (id: string) => {
    setSelectedId(id);
    setUpdateOpen(true);
  };

  const handleUpdateInput = (input: { input: UpdateVrfInput }) => {
    setUpdateInput(input);
  };

  const handleSetUpdateParams = (data: GetVrf) => {
    return {
      id: data.getVrf.id,
      name: data.getVrf.name,
      note: data.getVrf.note
    };
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  const handleUpdateDisabled = (params: any) => {
    return !(params.id !== "" && params.name !== "");
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
        name: searchName
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
      name: "name",
      label: "Name",
      required: true,
      multiline: false
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
      query: VRF_LIST_QUERY,
      variables: { input: {} },
      typename: "getVrfs",
      value: searchName,
      accessor: (d: GetVrfs_getVrfs) => d.name,
      handleChange: setSearchName,
      handleAutoComplete: handleSearchName
    }
  ];

  return (
    <>
      <ListTable
        title="VRF List"
        query={VRF_LIST_QUERY}
        typename="getVrfs"
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
        createMutation={VRF_CREATE_MUTATION}
        createMutationInput={createInput}
        handleCreateInput={handleCreateInput}
        listQuery={VRF_LIST_QUERY}
        searchInput={searchInput}
        handleCreateDisabled={handleCreateDisabled}
        initialCreateInput={initialCreateInput}
        fields={dialogFields}
      />
      <UpdateDialog
        id={selectedId}
        updateOpen={updateOpen}
        handleUpdateClose={handleUpdateClose}
        updateMutation={VRF_UPDATE_MUTATION}
        updateMutationInput={updateInput}
        handleSetParams={handleSetUpdateParams}
        handleUpdateInput={handleUpdateInput}
        updateTypename="updateVrf"
        handleUpdateDisabled={handleUpdateDisabled}
        detailQuery={VRF_DETAIL_QUERY}
        detailTypename="getVrf"
        fields={dialogFields}
      />
      <BulkDeleteDialog
        getSelected={getSelected}
        bulkDeleteOpen={bulkDeleteOpen}
        handleBulkDeleteClose={handleBulkDeleteClose}
        deleteMutation={VRF_BULK_DELETE_MUTATION}
        listQuery={VRF_LIST_QUERY}
        initSelected={initSelected}
        searchInput={searchInput}
      />
    </>
  );
};

export default Vrf;

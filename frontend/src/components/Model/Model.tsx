import React, { useState } from "react";
import { gqlInput, headCellsType, DialogFields } from "../../types";
import { AutoCompProps } from "../GraphqlAutoComplete/GraphqlAutoComplete";
import {
  CreateDeviceModelInput,
  UpdateDeviceModelInput
} from "../../../__generated__/globalTypes";
import { GetDeviceModels_getDeviceModels } from "../../graphql/queries/__generated__/GetDeviceModels";
import {
  MODEL_DETAIL_QUERY,
  MODEL_LIST_QUERY
} from "../../graphql/queries/modelQueries";
import {
  MODEL_BULK_DELETE_MUTATION,
  MODEL_CREATE_MUTATION,
  MODEL_UPDATE_MUTATION
} from "../../graphql/mutations/modelMutaions";
import ListTable from "../ListTable/ListTable";
import AddButton from "../AddButton/AddButton";
import CreateDialog from "../CreateDialog/CreateDialog";
import UpdateDialog from "../UpdateDialog/UpdateDialog";
import BulkDeleteDialog from "../BulkDeleteDialog/BulkDeleteDialog";
import { GetDeviceModel } from "../../graphql/queries/__generated__/GetDeviceModel";

const headCells: headCellsType = [
  { id: "name", numeric: false, disablePadding: false, label: "Model" },
  { id: "height", numeric: false, disablePadding: false, label: "Height(RU)" },
  {
    id: "updatedAt",
    numeric: false,
    disablePadding: false,
    label: "Updated at"
  }
];

const Model: React.FC = (): JSX.Element => {
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState("");
  // Search input
  const [searchName, setSearchName] = useState("");
  const [searchInput, setSearchInput] = useState<gqlInput>({ input: {} });
  // create dialog state
  const [createOpen, setCreateOpen] = useState(false);
  const initialCreateInput = {
    name: "",
    height: 1,
    width: 100,
    note: ""
  };
  const [createInput, setCreateInput] = useState<{
    input: CreateDeviceModelInput;
  }>({
    input: initialCreateInput
  });
  // update dialog state
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateInput, setUpdateInput] = useState<{
    input: UpdateDeviceModelInput;
  }>({
    input: {
      id: "",
      name: "",
      height: 1,
      width: 100,
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

  const handleCreateInput = (input: { input: CreateDeviceModelInput }) => {
    setCreateInput(input);
  };

  const handleCreateDisabled = (params: any) => {
    return !(params.name !== "" && params.height !== 0 && params.width !== 0);
  };

  const handleUpdateOpen = (id: string) => {
    setSelectedId(id);
    setUpdateOpen(true);
  };

  const handleUpdateInput = (input: { input: UpdateDeviceModelInput }) => {
    setUpdateInput(input);
  };

  const handleSetUpdateParams = (data: GetDeviceModel) => {
    return {
      id: data.getDeviceModel.id,
      name: data.getDeviceModel.name,
      height: data.getDeviceModel.height,
      width: data.getDeviceModel.width,
      note: data.getDeviceModel.note
    };
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  const handleUpdateDisabled = (params: any) => {
    return !(
      params.id !== "" &&
      params.name !== "" &&
      params.height !== 0 &&
      params.width !== 0
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
      name: "height",
      label: "Height(RU)",
      multiline: false
    },
    {
      name: "width",
      label: "Width(%)",
      multiline: false
    },
    {
      name: "note",
      label: "Note",
      multiline: true,
      rows: 3
    }
  ];

  const autoComp: AutoCompProps[] = [
    {
      label: "Name",
      query: MODEL_LIST_QUERY,
      variables: { input: {} },
      typename: "getDeviceModels",
      value: searchName,
      accessor: (d: GetDeviceModels_getDeviceModels) => d.name,
      handleChange: setSearchName,
      handleAutoComplete: handleSearchName
    }
  ];

  return (
    <>
      <ListTable
        title="Model List"
        query={MODEL_LIST_QUERY}
        typename="getDeviceModels"
        headCells={headCells}
        handleFilter={handleFilter}
        handleUpdateOpen={handleUpdateOpen}
        handleBulkDeleteOpen={handleBulkDeleteOpen}
        searchInput={searchInput}
        selected={selected}
        setSelected={setSelected}
        searchField={autoComp}
        orderByCol="updatedAt"
      />
      <AddButton handleCreateOpen={handleCreateOpen} />
      <CreateDialog
        createOpen={createOpen}
        handleCreateClose={handleCreateClose}
        createMutation={MODEL_CREATE_MUTATION}
        createMutationInput={createInput}
        handleCreateInput={handleCreateInput}
        listQuery={MODEL_LIST_QUERY}
        searchInput={searchInput}
        handleCreateDisabled={handleCreateDisabled}
        initialCreateInput={initialCreateInput}
        fields={dialogFields}
      />
      <UpdateDialog
        id={selectedId}
        updateOpen={updateOpen}
        handleUpdateClose={handleUpdateClose}
        updateMutation={MODEL_UPDATE_MUTATION}
        updateMutationInput={updateInput}
        handleSetParams={handleSetUpdateParams}
        handleUpdateInput={handleUpdateInput}
        updateTypename="updateDeviceModel"
        handleUpdateDisabled={handleUpdateDisabled}
        detailQuery={MODEL_DETAIL_QUERY}
        detailTypename="getDeviceModel"
        fields={dialogFields}
      />
      <BulkDeleteDialog
        getSelected={getSelected}
        bulkDeleteOpen={bulkDeleteOpen}
        handleBulkDeleteClose={handleBulkDeleteClose}
        deleteMutation={MODEL_BULK_DELETE_MUTATION}
        listQuery={MODEL_LIST_QUERY}
        initSelected={initSelected}
        searchInput={searchInput}
      />
    </>
  );
};

export default Model;

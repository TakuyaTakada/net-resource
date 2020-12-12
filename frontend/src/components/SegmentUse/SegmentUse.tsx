import React, { useState } from "react";
import {
  gqlInput,
  headCellsType,
  DialogFields,
  SearchFieldType
} from "../../types";
import { GetSegmentUse } from "../../graphql/queries/__generated__/GetSegmentUse";
import {
  CreateSegmentUseInput,
  UpdateSegmentUseInput
} from "../../../__generated__/globalTypes";
import ListTable from "../ListTable/ListTable";
import AddButton from "../AddButton/AddButton";
import CreateDialog from "../CreateDialog/CreateDialog";
import UpdateDialog from "../UpdateDialog/UpdateDialog";
import BulkDeleteDialog from "../BulkDeleteDialog/BulkDeleteDialog";
import { GetSegmentUses_getSegmentUses } from "../../graphql/queries/__generated__/GetSegmentUses";
import {
  SEGMENT_USE_DETAIL_QUERY,
  SEGMENT_USE_LIST_QUERY
} from "../../graphql/queries/segmentUseQueries";
import {
  SEGMENT_USE_BULK_DELETE_MUTATION,
  SEGMENT_USE_CREATE_MUTATION,
  SEGMENT_USE_UPDATE_MUTATION
} from "../../graphql/mutations/segmentUseMutations";

const headCells: headCellsType = [
  { id: "name", numeric: false, disablePadding: false, label: "Segment Use" },
  {
    id: "updatedAt",
    numeric: false,
    disablePadding: false,
    label: "Updated at"
  }
];

const SegmentUse: React.FC = (): JSX.Element => {
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
  const [createInput, setCreateInput] = useState<{
    input: CreateSegmentUseInput;
  }>({
    input: initialCreateInput
  });
  // update dialog state
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateInput, setUpdateInput] = useState<{
    input: UpdateSegmentUseInput;
  }>({
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

  const handleCreateInput = (input: { input: CreateSegmentUseInput }) => {
    setCreateInput(input);
  };

  const handleCreateDisabled = (params: any) => {
    return !(params.name !== "");
  };

  const handleUpdateOpen = (id: string) => {
    setSelectedId(id);
    setUpdateOpen(true);
  };

  const handleUpdateInput = (input: { input: UpdateSegmentUseInput }) => {
    setUpdateInput(input);
  };

  const handleSetUpdateParams = (data: GetSegmentUse) => {
    return {
      id: data.getSegmentUse.id,
      name: data.getSegmentUse.name,
      note: data.getSegmentUse.note
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
      query: SEGMENT_USE_LIST_QUERY,
      variables: { input: {} },
      typename: "getSegmentUses",
      value: searchName,
      accessor: (d: GetSegmentUses_getSegmentUses) => d.name,
      handleChange: setSearchName,
      handleAutoComplete: handleSearchName
    }
  ];

  return (
    <>
      <ListTable
        title="Segment Use List"
        query={SEGMENT_USE_LIST_QUERY}
        typename="getSegmentUses"
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
        createMutation={SEGMENT_USE_CREATE_MUTATION}
        createMutationInput={createInput}
        handleCreateInput={handleCreateInput}
        listQuery={SEGMENT_USE_LIST_QUERY}
        searchInput={searchInput}
        handleCreateDisabled={handleCreateDisabled}
        initialCreateInput={initialCreateInput}
        fields={dialogFields}
      />
      <UpdateDialog
        id={selectedId}
        updateOpen={updateOpen}
        handleUpdateClose={handleUpdateClose}
        updateMutation={SEGMENT_USE_UPDATE_MUTATION}
        updateMutationInput={updateInput}
        handleSetParams={handleSetUpdateParams}
        handleUpdateInput={handleUpdateInput}
        updateTypename="updateSegmentUse"
        handleUpdateDisabled={handleUpdateDisabled}
        detailQuery={SEGMENT_USE_DETAIL_QUERY}
        detailTypename="getSegmentUse"
        fields={dialogFields}
      />
      <BulkDeleteDialog
        getSelected={getSelected}
        bulkDeleteOpen={bulkDeleteOpen}
        handleBulkDeleteClose={handleBulkDeleteClose}
        deleteMutation={SEGMENT_USE_BULK_DELETE_MUTATION}
        listQuery={SEGMENT_USE_LIST_QUERY}
        initSelected={initSelected}
        searchInput={searchInput}
      />
    </>
  );
};

export default SegmentUse;

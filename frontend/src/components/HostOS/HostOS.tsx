import React, { useState } from "react";
import { gqlInput, headCellsType, DialogFields } from "../../types";
import { GetHostOS } from "../../graphql/queries/__generated__/GetHostOS";
import { GethostOSes_getHostOSes } from "../../graphql/queries/__generated__/GethostOSes";
import { AutoCompProps } from "../GraphqlAutoComplete/GraphqlAutoComplete";
import { SelectorProps } from "../GraphqlSelector/GraphqlSelector";
import {
  CreateHostOSInput,
  UpdateHostOSInput
} from "../../../__generated__/globalTypes";
import {
  OS_DETAIL_QUERY,
  OS_LIST_QUERY
} from "../../graphql/queries/osQueries";
import {
  OS_BULK_DELETE_MUTATION,
  OS_CREATE_MUTATION,
  OS_UPDATE_MUTATION
} from "../../graphql/mutations/osMutations";
import ListTable from "../ListTable/ListTable";
import AddButton from "../AddButton/AddButton";
import CreateDialog from "../CreateDialog/CreateDialog";
import UpdateDialog from "../UpdateDialog/UpdateDialog";
import BulkDeleteDialog from "../BulkDeleteDialog/BulkDeleteDialog";
import { HOST_LIST_QUERY } from "../../graphql/queries/hostQueries";
import { GetHosts_getHosts } from "../../graphql/queries/__generated__/GetHosts";

const headCells: headCellsType = [
  { id: "name", numeric: false, disablePadding: false, label: "HostOS" },
  {
    id: "updatedAt",
    numeric: false,
    disablePadding: false,
    label: "Updated at"
  }
];

const HostOS: React.FC = (): JSX.Element => {
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState("");
  // search state
  const [searchName, setSearchName] = useState("");
  const [searchInput, setSearchInput] = useState<gqlInput>({ input: {} });
  // create dialog state
  const [createOpen, setCreateOpen] = useState(false);
  const initialCreateInput = {
    name: "",
    hostIds: [],
    note: ""
  };
  const [createInput, setCreateInput] = useState<{ input: CreateHostOSInput }>({
    input: initialCreateInput
  });
  // update dialog state
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateInput, setUpdateInput] = useState<{ input: UpdateHostOSInput }>({
    input: {
      id: "",
      name: "",
      hostIds: [],
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

  const handleCreateInput = (input: { input: CreateHostOSInput }) => {
    setCreateInput(input);
  };

  const handleCreateDisabled = (params: any) => {
    return !(params.name !== "");
  };

  const handleUpdateOpen = (id: string) => {
    setSelectedId(id);
    setUpdateOpen(true);
  };

  const handleUpdateInput = (input: { input: UpdateHostOSInput }) => {
    setUpdateInput(input);
  };

  const handleSetUpdateParams = (data: GetHostOS) => {
    return {
      id: data.getHostOS.id,
      name: data.getHostOS.name,
      hostIds: data.getHostOS.hosts
        ? data.getHostOS.hosts.map(d => (d ? d.id : null))
        : [],
      note: data.getHostOS.note
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
      title: "Select hosts",
      checkedName: "hostIds",
      query: HOST_LIST_QUERY,
      variables: { input: { hostOSIdOr: selectedId, hostOSIsNull: true } },
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

  const searchField: (AutoCompProps | SelectorProps)[] = [
    {
      label: "Name",
      query: OS_LIST_QUERY,
      variables: { input: {} },
      typename: "getHostOSes",
      value: searchName,
      accessor: (d: GethostOSes_getHostOSes) => d.name,
      handleChange: setSearchName,
      handleAutoComplete: handleSearchName
    }
  ];

  return (
    <>
      <ListTable
        title="OS List"
        query={OS_LIST_QUERY}
        typename="getHostOSes"
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
        createMutation={OS_CREATE_MUTATION}
        createMutationInput={createInput}
        handleCreateInput={handleCreateInput}
        listQuery={OS_LIST_QUERY}
        searchInput={searchInput}
        handleCreateDisabled={handleCreateDisabled}
        initialCreateInput={initialCreateInput}
        fields={dialogFields}
      />
      <UpdateDialog
        id={selectedId}
        updateOpen={updateOpen}
        handleUpdateClose={handleUpdateClose}
        updateMutation={OS_UPDATE_MUTATION}
        updateMutationInput={updateInput}
        handleSetParams={handleSetUpdateParams}
        handleUpdateInput={handleUpdateInput}
        updateTypename="updateHostOS"
        handleUpdateDisabled={handleUpdateDisabled}
        detailQuery={OS_DETAIL_QUERY}
        detailTypename="getHostOS"
        fields={dialogFields}
      />
      <BulkDeleteDialog
        getSelected={getSelected}
        bulkDeleteOpen={bulkDeleteOpen}
        handleBulkDeleteClose={handleBulkDeleteClose}
        deleteMutation={OS_BULK_DELETE_MUTATION}
        listQuery={OS_LIST_QUERY}
        initSelected={initSelected}
        searchInput={searchInput}
      />
    </>
  );
};

export default HostOS;

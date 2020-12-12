import React, { useState } from "react";
import {
  gqlInput,
  headCellsType,
  DialogFields,
  SearchFieldType
} from "../../types";
import { GetIpSegments_getIpSegments } from "../../graphql/queries/__generated__/GetIpSegments";
import { GetVrfs_getVrfs } from "../../graphql/queries/__generated__/GetVrfs";
import { GetSegmentUses_getSegmentUses } from "../../graphql/queries/__generated__/GetSegmentUses";
import { GetIpSegment } from "../../graphql/queries/__generated__/GetIpSegment";
import {
  CreateIpSegmentInput,
  UpdateIpSegmentInput
} from "../../../__generated__/globalTypes";
import {
  IP_SEGMENT_DETAIL_QUERY,
  IP_SEGMENT_LIST_QUERY
} from "../../graphql/queries/ipSegmentQueries";
import { VRF_LIST_QUERY } from "../../graphql/queries/vrfQueries";
import { SEGMENT_USE_LIST_QUERY } from "../../graphql/queries/segmentUseQueries";
import {
  IP_SEGMENT_BULK_DELETE_MUTATION,
  IP_SEGMENT_CREATE_MUTATION,
  IP_SEGMENT_UPDATE_MUTATION
} from "../../graphql/mutations/ipSegmentMutations";
import ListTable from "../ListTable/ListTable";
import AddButton from "../AddButton/AddButton";
import CreateDialog from "../CreateDialog/CreateDialog";
import UpdateDialog from "../UpdateDialog/UpdateDialog";
import BulkDeleteDialog from "../BulkDeleteDialog/BulkDeleteDialog";

const headCells: headCellsType = [
  {
    id: "ipSegment",
    numeric: false,
    disablePadding: false,
    label: "IP Segment",
    link: "/ipam/segment/"
  },
  {
    id: "vrf",
    nestId: "name",
    numeric: false,
    disablePadding: false,
    label: "VRF"
  },
  {
    id: "use",
    nestId: "name",
    numeric: false,
    disablePadding: false,
    label: "Use"
  },
  {
    id: "updatedAt",
    numeric: false,
    disablePadding: false,
    label: "Updated at"
  }
];

const IpSegment: React.FC = (): JSX.Element => {
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState("");
  // search state
  const [searchSegment, setSearchSegment] = useState("");
  const [searchVrf, setSearchVrf] = useState("");
  const [searchUse, setSearchUse] = useState("");
  const [searchInput, setSearchInput] = useState<gqlInput>({ input: {} });
  // create dialog state
  const [createOpen, setCreateOpen] = useState(false);
  const initialCreateInput = {
    ipSegment: "",
    vrfId: "",
    useId: "",
    note: ""
  };
  const [createInput, setCreateInput] = useState<{
    input: CreateIpSegmentInput;
  }>({
    input: initialCreateInput
  });
  // update dialog state
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateInput, setUpdateInput] = useState<{
    input: UpdateIpSegmentInput;
  }>({
    input: {
      id: "",
      vrfId: "",
      useId: "",
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

  const handleCreateInput = (input: { input: CreateIpSegmentInput }) => {
    setCreateInput(input);
  };

  const handleCreateDisabled = (params: any) => {
    return !params.ipSegment;
  };

  const handleUpdateOpen = (id: string) => {
    setSelectedId(id);
    setUpdateOpen(true);
  };

  const handleUpdateInput = (input: { input: UpdateIpSegmentInput }) => {
    setUpdateInput(input);
  };

  const handleSetUpdateParams = (data: GetIpSegment) => {
    return {
      id: data.getIpSegment.id,
      vrfId: data.getIpSegment.vrf ? data.getIpSegment.vrf.id : "",
      useId: data.getIpSegment.use ? data.getIpSegment.use.id : "",
      note: data.getIpSegment.note
    };
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  const handleUpdateDisabled = (params: any) => {
    return !(params.id !== "");
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
        ipSegment: searchSegment,
        vrfId: searchVrf,
        useId: searchUse
      }
    });
  };

  const handleSearchSegment = (event: Event, value: string) => {
    setSearchSegment(value);
  };

  const initSelected = () => setSelected([]);
  const getSelected = () => selected;

  const dialogFields: DialogFields = [
    {
      name: "ipSegment",
      label: "xx.xx.xx.xx/xx",
      required: true,
      multiline: false,
      update: false
    },
    {
      name: "vrfId",
      blankText: "---- Choose vrf ----",
      query: VRF_LIST_QUERY,
      variables: { input: {} },
      typename: "getVrfs",
      accessors: {
        value: (d: GetVrfs_getVrfs) => d.id,
        text: (d: GetVrfs_getVrfs) => d.name
      }
    },
    {
      name: "useId",
      blankText: "---- Choose use ----",
      query: SEGMENT_USE_LIST_QUERY,
      variables: { input: {} },
      typename: "getSegmentUses",
      accessors: {
        value: (d: GetSegmentUses_getSegmentUses) => d.id,
        text: (d: GetSegmentUses_getSegmentUses) => d.name
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
      label: "Ip Segment",
      query: IP_SEGMENT_LIST_QUERY,
      variables: { input: {} },
      typename: "getIpSegments",
      value: searchSegment,
      accessor: (d: GetIpSegments_getIpSegments) => d.ipSegment,
      handleChange: setSearchSegment,
      handleAutoComplete: handleSearchSegment
    },
    {
      name: "vrfId",
      blankText: "-- VRF --",
      query: VRF_LIST_QUERY,
      variables: { input: {} },
      typename: "getVrfs",
      value: searchVrf,
      accessors: {
        value: (d: GetVrfs_getVrfs) => d.id,
        text: (d: GetVrfs_getVrfs) => d.name
      },
      handleChange: setSearchVrf
    },
    {
      name: "useId",
      blankText: "-- Use --",
      query: SEGMENT_USE_LIST_QUERY,
      variables: { input: {} },
      typename: "getSegmentUses",
      value: searchUse,
      accessors: {
        value: (d: GetVrfs_getVrfs) => d.id,
        text: (d: GetVrfs_getVrfs) => d.name
      },
      handleChange: setSearchUse
    }
  ];

  return (
    <>
      <ListTable
        title="IP Segment List"
        query={IP_SEGMENT_LIST_QUERY}
        typename="getIpSegments"
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
        createMutation={IP_SEGMENT_CREATE_MUTATION}
        createMutationInput={createInput}
        handleCreateInput={handleCreateInput}
        listQuery={IP_SEGMENT_LIST_QUERY}
        searchInput={searchInput}
        handleCreateDisabled={handleCreateDisabled}
        initialCreateInput={initialCreateInput}
        fields={dialogFields}
      />
      <UpdateDialog
        id={selectedId}
        updateOpen={updateOpen}
        handleUpdateClose={handleUpdateClose}
        updateMutation={IP_SEGMENT_UPDATE_MUTATION}
        updateMutationInput={updateInput}
        handleSetParams={handleSetUpdateParams}
        handleUpdateInput={handleUpdateInput}
        updateTypename="updateIpSegment"
        handleUpdateDisabled={handleUpdateDisabled}
        detailQuery={IP_SEGMENT_DETAIL_QUERY}
        detailTypename="getIpSegment"
        fields={dialogFields}
      />
      <BulkDeleteDialog
        getSelected={getSelected}
        bulkDeleteOpen={bulkDeleteOpen}
        handleBulkDeleteClose={handleBulkDeleteClose}
        deleteMutation={IP_SEGMENT_BULK_DELETE_MUTATION}
        listQuery={IP_SEGMENT_LIST_QUERY}
        initSelected={initSelected}
        searchInput={searchInput}
      />
    </>
  );
};

export default IpSegment;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ListTable from "../../ListTable/ListTable";
import {
  IPADDR_DETAIL_QUERY,
  IPADDR_LIST_QUERY
} from "../../../graphql/queries/ipaddrQueries";
import {
  DialogFields,
  gqlInput,
  headCellsType,
  SearchFieldType
} from "../../../types";
import { UpdateIpaddrInput } from "../../../../__generated__/globalTypes";
import { GetIpaddr } from "../../../graphql/queries/__generated__/GetIpaddr";
import { GetIpaddrs_getIpaddrs } from "../../../graphql/queries/__generated__/GetIpaddrs";
import { IPADDR_STATUSES, IPADDR_TYPE } from "../../../const";
import UpdateDialog from "../../UpdateDialog/UpdateDialog";
import { IPADDR_UPDATE_MUTATION } from "../../../graphql/mutations/ipaddrMutations";

const headCells: headCellsType = [
  {
    id: "ip",
    numeric: false,
    disablePadding: false,
    label: "IP Segment"
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
    translate: IPADDR_STATUSES
  },
  {
    id: "type",
    numeric: false,
    disablePadding: false,
    label: "Type",
    translate: IPADDR_TYPE
  },
  {
    id: "updatedAt",
    numeric: false,
    disablePadding: false,
    label: "Updated at"
  }
];

const Ipaddr: React.FC = (): JSX.Element => {
  const { id } = useParams();
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState("");
  // search state
  const [searchIp, setSearchIp] = useState("");
  const [searchStatus, setSearchStatus] = useState(0);
  const [searchType, setSearchType] = useState(0);
  const [searchInput, setSearchInput] = useState<gqlInput>({
    input: { ipSegmentId: id }
  });
  // update dialog state
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateInput, setUpdateInput] = useState<{ input: UpdateIpaddrInput }>({
    input: {
      id: "",
      status: 0,
      type: 0,
      note: ""
    }
  });
  const handleUpdateOpen = (id: string) => {
    setSelectedId(id);
    setUpdateOpen(true);
  };

  const handleUpdateInput = (input: { input: UpdateIpaddrInput }) => {
    setUpdateInput(input);
  };

  const handleSetUpdateParams = (data: GetIpaddr) => {
    return {
      id: data.getIpaddr.id,
      status: data.getIpaddr.status,
      type: data.getIpaddr.type,
      note: data.getIpaddr.note
    };
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  const handleUpdateDisabled = (params: any) => {
    return !(
      params.id !== "" &&
      params.ip !== "" &&
      params.status !== 0 &&
      params.type !== 0
    );
  };

  const handleFilter = () => {
    setSearchInput({
      input: {
        ip: searchIp,
        status: searchStatus,
        type: searchType,
        ipSegmentId: id
      }
    });
  };

  const handleSearchIp = (event: Event, value: string) => {
    setSearchIp(value);
  };

  const dialogFields: DialogFields = [
    {
      name: "ip",
      label: "xx.xx.xx.xx",
      required: true,
      multiline: false,
      update: false
    },
    {
      name: "status",
      label: "Status",
      transList: IPADDR_STATUSES
    },
    {
      name: "type",
      label: "Type",
      transList: IPADDR_TYPE
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
      label: "IP",
      query: IPADDR_LIST_QUERY,
      variables: { input: { ipSegmentId: id } },
      typename: "getIpaddrs",
      value: searchIp,
      accessor: (d: GetIpaddrs_getIpaddrs) => d.ip,
      handleChange: setSearchIp,
      handleAutoComplete: handleSearchIp
    },
    {
      name: "status",
      blankText: "-- Status --",
      transList: IPADDR_STATUSES,
      value: searchStatus,
      handleChange: setSearchStatus
    },
    {
      name: "type",
      blankText: "-- Type --",
      transList: IPADDR_TYPE,
      value: searchType,
      handleChange: setSearchType
    }
  ];

  return (
    <>
      <ListTable
        title="IP Address List"
        query={IPADDR_LIST_QUERY}
        typename="getIpaddrs"
        headCells={headCells}
        handleFilter={handleFilter}
        handleUpdateOpen={handleUpdateOpen}
        searchInput={searchInput}
        selected={selected}
        setSelected={setSelected}
        searchField={searchField}
        orderByCol="ip"
        asc
        disableCheckbox
      />
      <UpdateDialog
        id={selectedId}
        updateOpen={updateOpen}
        handleUpdateClose={handleUpdateClose}
        updateMutation={IPADDR_UPDATE_MUTATION}
        updateMutationInput={updateInput}
        handleSetParams={handleSetUpdateParams}
        handleUpdateInput={handleUpdateInput}
        updateTypename="updateIpaddr"
        handleUpdateDisabled={handleUpdateDisabled}
        detailQuery={IPADDR_DETAIL_QUERY}
        detailTypename="getIpaddr"
        fields={dialogFields}
      />
    </>
  );
};

export default Ipaddr;

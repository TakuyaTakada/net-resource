import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { PORT_LIST_AND_DEVICE_DETAIL_QUERY } from "../../../graphql/queries/portQueris";
import { useParams } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import { DEVICE_STATUSES } from "../../../const";
import { GetPortsAndDevice } from "../../../graphql/queries/__generated__/GetPortsAndDevice";
import DeviceInfoTable, { DeviceInfo } from "./DeviceInfoTable/DeviceInfoTable";
import InterfaceTable from "./InterfaceTable/InterfaceTable";

const DeviceDetail: React.FC = (): JSX.Element => {
  const { id } = useParams();
  const [info, setInfo] = useState<DeviceInfo[]>([]);
  const { loading, error, data } = useQuery<GetPortsAndDevice>(
    PORT_LIST_AND_DEVICE_DETAIL_QUERY,
    {
      variables: { portInput: { deviceId: id }, deviceInput: { id: id } },
      onCompleted: data => {
        console.log(data);
        const status = DEVICE_STATUSES.find(
          status => status.value === data.getDevice.status
        );
        const deviceInfo = [
          {
            title: "Device",
            value: data.getDevice.name
          },
          {
            title: "Host",
            value: data.getDevice.host ? data.getDevice.host.name : ""
          },
          {
            title: "Status",
            value: status ? status.text : ""
          },
          {
            title: "Model",
            value: data.getDevice.deviceModel.name
          }
        ];
        setInfo(deviceInfo);
      }
    }
  );
  if (loading) return <LinearProgress />;
  if (error) return <p>{`Error! ${error.message}`}</p>;
  if (!data) return <p>No Data</p>;

  return (
    <>
      {info ? <DeviceInfoTable info={info} /> : null}
      <InterfaceTable ports={data.getPorts} />
    </>
  );
};

export default DeviceDetail;

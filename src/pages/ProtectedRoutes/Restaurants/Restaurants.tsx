import { useQuery } from "@tanstack/react-query";
import { getTenants } from "../../../http/apis/api";
import { throwErrorMessage } from "../../../utils/methods";
import { Table, Typography } from "antd";
import { COLORS } from "../../../styles/theme";
import dayjs from "dayjs";

const getAllTenants = async () => {
  try {
    const { data } = await getTenants();
    return data;
  } catch (error) {
    throwErrorMessage({ err: error });
    throw error;
  }
};

const { Text } = Typography;
const tenantColumns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    fixed: "left",
    width: 150,
  },
  {
    title: "Tenant name",
    dataIndex: "name",
    key: "name",
    render: (text: string) => {
      return <Text style={{ color: COLORS.COLOR_PRIMARY }}>{text}</Text>;
    },
  },
  {
    title: "Tenant address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text: string) => {
      return (
        <Text style={{ color: COLORS.COLOR_PRIMARY }}>
          {dayjs(text).format("DD MMM YYYY")}
        </Text>
      );
    },
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (text: string) => {
      return (
        <Text>{dayjs(text).format('DD MMM YYYY')}</Text>
      )
    }
  },
];

const Restaurants = () => {
  const { data: tenantsList, isLoading: tenantsLoading } = useQuery({
    queryKey: ["tenants"],
    queryFn: getAllTenants,
  });

  console.log(tenantsList);

  return (
    <>
      {tenantsLoading && <div>Loading...</div>}
      <Table
        columns={tenantColumns}
        dataSource={tenantsList}
        scroll={{ x: 1300 }}
        rowKey={"id"}
      />
    </>
  );
};

export default Restaurants;

import { useQuery } from "@tanstack/react-query";
import { getTenants } from "../../../http/apis/api";
import { throwErrorMessage } from "../../../utils/methods";
import { Button, Drawer, Flex, Space, Table, Typography } from "antd";
import { COLORS } from "../../../styles/theme";
import dayjs from "dayjs";
import { useState } from "react";
import RestaurantFilter from "./Components/RestaurantFilter";
import { PlusOutlined } from "@ant-design/icons";

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
      return <Text>{dayjs(text).format("DD MMM YYYY")}</Text>;
    },
  },
];

const Restaurants = () => {
  const { data: tenantsList, isLoading: tenantsLoading } = useQuery({
    queryKey: ["tenants"],
    queryFn: getAllTenants,
  });

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const handleFilterChange = (filterName: string, filterValue: string) => {
    console.log("Filter", filterName, filterValue);
  };

  return (
    <>
      {tenantsLoading && <div>Loading...</div>}

      <Flex gap={10} vertical>
        <RestaurantFilter onFilterChange={handleFilterChange}>
          <Button icon={<PlusOutlined />} onClick={() => setDrawerOpen(true)}>
            Add Restaurant
          </Button>
        </RestaurantFilter>
        <Table
          columns={tenantColumns}
          dataSource={tenantsList}
          scroll={{ x: 1300 }}
          rowKey={"id"}
        />

        <Drawer
          title="Create Tenant"
          width={500}
          destroyOnClose
          onClose={() => {
            setDrawerOpen(false);
          }}
          open={drawerOpen}
          extra={
            <Space>
              <Button>Cancel</Button>
              <Button>Submit</Button>
            </Space>
          }
        >
          Content
        </Drawer>
      </Flex>
    </>
  );
};

export default Restaurants;

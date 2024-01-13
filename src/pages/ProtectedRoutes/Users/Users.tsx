import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../http/apis/api";
import { throwErrorMessage } from "../../../utils/methods";
import { IUser } from "./types";
import { Flex, Space, Table, Typography } from "antd";
import { COLORS } from "../../../styles/theme";
import dayjs from "dayjs";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../../store";
import { DASHBOARD_ALLOWED_ROLES } from "../../../utils/constants";
import { DASHBOARD_ROUTES } from "../../../utils/routeConstants";
import UsersFilter from "./Components/UsersFilter";

const getAllUsers = async () => {
  try {
    const { data } = await getUsers();
    return data;
  } catch (error) {
    throwErrorMessage({ err: error });
    throw error;
  }
};

const { Text } = Typography;
const userColumn = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    fixed: "left",
    width: 120,
  },
  {
    title: "Name",
    dataIndex: "firstName",
    key: "firstName",
    render: (_text: string, record: IUser) => {
      return (
        <Text style={{ color: COLORS.COLOR_PRIMARY }}>
          {record.firstName} {record.lastName}
        </Text>
      );
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (text: string) => {
      return <Text style={{ color: COLORS.COLOR_PRIMARY }}>{text}</Text>;
    },
  },
  {
    title: "Registered On",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text: string) => {
      return <Text>{dayjs(text).format("DD MMM YYYY")}</Text>;
    },
  },
];

const Users = () => {
  const { user } = useAuthStore();
  if (user && user.role !== DASHBOARD_ALLOWED_ROLES.ADMIN) {
    return <Navigate to={DASHBOARD_ROUTES.root} />;
  }

  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const handleFilterChange = (filterName: string, filterValue: string) => {
    console.log('Filter', filterName, filterValue);
  };

  return (
    <>
      {usersLoading && <div>Loading...</div>}
      {usersError && <div>Error</div>}

      <Flex vertical gap="10px">
        <UsersFilter onFilterChange={handleFilterChange} />
        <Table
          columns={userColumn}
          dataSource={usersData}
          scroll={{ x: 1300 }}
          rowKey={'id'}
        />
      </Flex>
    </>
  );
};

export default Users;

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../http/apis/api";
import { throwErrorMessage } from "../../../utils/methods";
import { IUser } from "./types";
import { Table, Typography } from "antd";
import { COLORS } from "../../../styles/theme";

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
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "First Name",
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
];

const Users = () => {
  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  return (
    <>
      {usersLoading && <div>Loading...</div>}
      {usersError && <div>Error</div>}

      <Table
        columns={userColumn}
        dataSource={usersData}
        style={{ marginTop: "10px" }}
        scroll={{ x: 1300 }}
      />
    </>
  );
};

export default Users;

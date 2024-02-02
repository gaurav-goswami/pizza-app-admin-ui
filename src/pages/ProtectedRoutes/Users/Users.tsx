import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, getUsers } from "../../../http/apis/api";
import { throwErrorMessage } from "../../../utils/methods";
import { IUser } from "./types";
import {
  Button,
  Drawer,
  Flex,
  Form,
  Space,
  Table,
  Typography,
  theme,
} from "antd";
import { COLORS } from "../../../styles/theme";
import dayjs from "dayjs";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../../store";
import { DASHBOARD_ALLOWED_ROLES } from "../../../utils/constants";
import { DASHBOARD_ROUTES } from "../../../utils/routeConstants";
import UsersFilter from "./Components/UsersFilter";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import UserForm from "./Components/UserForm";
import { useForm } from "antd/es/form/Form";

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
  
  const queryClient = useQueryClient();
  const [form] = useForm();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  
  const {
    token: { colorBgLayout },
  } = theme.useToken();
  
  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const handleFilterChange = (filterName: string, filterValue: string) => {
    console.log("Filter", filterName, filterValue);
  };

  const createUserFn = async (userData: IUser) => {
    try {
      const { data } = await createUser(userData);
      return data;
    } catch (error) {
      throwErrorMessage({ err: error });
      throw error;
    }
  };

  const { mutate: userMutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: (data: IUser) => createUserFn(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleSubmit = async () => {
    await form.validateFields();
    userMutate(form.getFieldsValue());
    form.resetFields();
    setDrawerOpen(false);
  };

  if (user && user.role !== DASHBOARD_ALLOWED_ROLES.ADMIN) {
    return <Navigate to={DASHBOARD_ROUTES.root} />;
  }

  return (
    <>
      {usersLoading && <div>Loading...</div>}
      {usersError && <div>Error</div>}

      <Flex vertical gap="10px">
        <UsersFilter onFilterChange={handleFilterChange}>
          <Button icon={<PlusOutlined />} onClick={() => setDrawerOpen(true)}>
            Add user
          </Button>
        </UsersFilter>
        <Table
          columns={userColumn}
          dataSource={usersData || []}
          scroll={{ x: 1300 }}
          rowKey={"id"}
        />

        <Drawer
          title="Create User"
          width={500}
          destroyOnClose
          styles={{ body: { background: colorBgLayout } }}
          onClose={() => {
            setDrawerOpen(false);
            form.resetFields();
          }}
          open={drawerOpen}
          extra={
            <Space>
              <Button
                onClick={() => {
                  form.resetFields();
                  setDrawerOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </Space>
          }
        >
          <Form layout="vertical" form={form}>
            <UserForm />
          </Form>
        </Drawer>
      </Flex>
    </>
  );
};

export default Users;

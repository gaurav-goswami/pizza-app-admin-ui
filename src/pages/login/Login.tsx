import { Button, Card, Checkbox, Flex, Form, Input, Layout, Space } from "antd";
import { LockFilled, UserOutlined, LockOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TCredentials } from "../../utils/types";
import { login, logout, self } from "../../http/apis/api";
import { useAuthStore } from "../../store";
import { usePermission } from "../../hooks/usePermission";
import { throwErrorMessage } from "../../utils/methods";
import useLogout from "../../hooks/useLogout";

const loginUser = async (credentials: TCredentials) => {
  try {
    const { data } = await login(credentials);
    return data;
  } catch (error: any) {
    throwErrorMessage({ err: error });
    throw error;
  }
};

const getSelf = async () => {
  const { data } = await self();
  return data;
};

const Login = () => {
  const { isAllowed } = usePermission();

  const { setUser } = useAuthStore();

  const { refetch } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
    enabled: false,
  });

  const { logoutUser } = useLogout();

  const { mutate: loginMutation, isPending: loginPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    onSuccess: async () => {
      const selfDataPromise = await refetch();
      if (!isAllowed(selfDataPromise.data)) {
        await logout();
        logoutUser();
      }
      setUser(selfDataPromise.data);
    },
  });

  return (
    <>
      <Layout
        style={{ height: "100vh", display: "grid", placeItems: "center" }}
      >
        <Card
          bordered={false}
          title={
            <Space
              style={{ width: "100%", fontSize: 16, justifyContent: "center" }}
            >
              <LockFilled />
              Sign In
            </Space>
          }
          style={{ width: 300 }}
        >
          <Form
            initialValues={{
              remember: true,
            }}
            onFinish={(values) => {
              const { email, password } = values;
              loginMutation({ email, password });
            }}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email is required",
                },
                {
                  type: "email",
                  message: "Enter a valid email",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Password is required",
                },
                {
                  min: 8,
                  message: "Password should be of min. 8 characters",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            <Flex justify="space-between">
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href="" id="login-forgot">
                Forgot password
              </a>
            </Flex>
            <Form.Item>
              <Button
                // type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                loading={loginPending}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Layout>
    </>
  );
};

export default Login;

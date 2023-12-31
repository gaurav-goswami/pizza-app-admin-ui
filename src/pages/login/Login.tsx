import { Alert, Button, Card, Checkbox, Flex, Form, Input, Layout, Space } from "antd";
import { LockFilled, UserOutlined, LockOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TCredentials } from "../../types";
import { login, self } from "../../http/api";
import { useAuthStore } from "../../store";

const loginUser = async (credentials: TCredentials) => {
  const {data} = await login(credentials);
  return data;
}

const getSelf = async () => {
  const {data} = await self();
  return data;
}

const Login = () => {

  const { setUser } = useAuthStore();
 
  const {refetch} = useQuery({
    queryKey: ['self'],
    queryFn: getSelf,
    enabled: false
  })

  const {mutate, isPending, isError, error} = useMutation({
    mutationKey: ['login'],
    mutationFn: loginUser,
    onSuccess: async () => {
      const selfDataPromise = await refetch();
      setUser(selfDataPromise.data);
      console.log('user data', selfDataPromise.data);
      console.log('Login success')
    }
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
              const {email, password} = values;
              mutate({email, password});
            }}
          >

            {
              isError && <Alert type="error" message={error.message} style={{marginBottom: 20}}/>
            }

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
              <a href="" id="login-forgot">Forgot password</a>
            </Flex>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                loading={isPending}
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

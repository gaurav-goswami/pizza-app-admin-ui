import { Button, Card, Checkbox, Flex, Form, Input, Layout, Space } from "antd";
import { LockFilled, UserOutlined, LockOutlined } from "@ant-design/icons";

const Login = () => {
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
          >
            <Form.Item
              name="username"
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
              <Input prefix={<UserOutlined />} placeholder="Username" />
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

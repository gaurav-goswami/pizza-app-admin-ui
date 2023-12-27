import { Button, Card, Checkbox, Form, Input, Layout, Space } from "antd";
import { LockFilled, UserOutlined, LockOutlined  } from "@ant-design/icons";

const Login = () => {
  return (
    <>
      {/* <h1>Sign In</h1>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Log In</button>
        <label htmlFor="remember-me">Remember Me</label>
        <input type="checkbox" id="remember-me" />
        <a href="#">Forgot Password</a> */}

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
          <Form>
            <Form.Item name="username">
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item name="password">
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item name="remember">
              <Checkbox>Remember me</Checkbox>
              <a href="">Forgot password</a>
            </Form.Item>
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

import { Card, Col, Form, Input, Row, Select, Space } from "antd";
import { ITenantData } from "../../Restaurants/types";
import useGetAllTenants from "../../../../hooks/useGetAllTenants";

const UserForm = () => {
  const { tenantsList, tenantsLoading } = useGetAllTenants();

  return (
    <>
      <Row>
        <Col span={24}>
          <Space direction="vertical" size="large">
            <Card title="Basic Information" bordered={false}>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "First name is required",
                      },
                    ]}
                  >
                    <Input size="middle" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Last name is required",
                      },
                    ]}
                  >
                    <Input size="middle" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Email"
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
                    <Input size="middle" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Card title="Security Information" bordered={false}>
              <Row gutter={8}>
                <Col span={24}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Password is required",
                      },
                    ]}
                  >
                    <Input.Password size="middle" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Card title="Role" bordered={false}>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    label="Role"
                    rules={[
                      {
                        required: true,
                        message: "Role is required",
                      },
                    ]}
                    name="role"
                  >
                    <Select
                      style={{ width: "100%", minWidth: "max-content" }}
                      allowClear
                      placeholder="Select Role"
                    >
                      <Select.Option value="admin">Admin</Select.Option>
                      <Select.Option value="manager">Manager</Select.Option>
                      <Select.Option value="customer">Customer</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Restaurant"
                    rules={[
                      {
                        required: true,
                        message: "Restaurant is required",
                      },
                    ]}
                    name="tenant"
                  >
                    {tenantsLoading && <div>Loading...</div>}
                    <Select
                      style={{ width: "100%", minWidth: "max-content" }}
                      allowClear
                      placeholder="Select Restaurant"
                    >
                      {tenantsList &&
                        tenantsList.map((tenant: ITenantData) => {
                          return (
                            <Select.Option key={tenant.id} value={tenant.id}>
                              {tenant.name}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default UserForm;

import { useQuery } from "@tanstack/react-query";
import { Card, Col, Form, Input, Row, Select, Space } from "antd";
import { getTenants } from "../../../../http/apis/api";
import { throwErrorMessage } from "../../../../utils/methods";
import { ITenantData } from "../../Restaurants/types";

const getAllTenants = async () => {
  try {
    const { data } = await getTenants();
    return data;
  } catch (error) {
    throwErrorMessage({ err: error });
    throw error;
  }
};

const UserForm = () => {
  const { data: tenantsList, isLoading: tenantsLoading } = useQuery({
    queryKey: ["tenants"],
    queryFn: getAllTenants,
  });
  return (
    <>
      <Row>
        <Col span={24}>
          <Space direction="vertical" size="large">
            <Card title="Basic Information" bordered={false}>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item label="First Name" name="firstName">
                    <Input size="middle" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Last Name" name="lastName">
                    <Input size="middle" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Email" name="firstName">
                    <Input size="middle" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Card title="Security Information" bordered={false}>
              <Row gutter={8}>
                <Col span={24}>
                  <Form.Item label="Password" name="password">
                    <Input.Password size="middle" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Card title="Role" bordered={false}>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item label="Role">
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
                  <Form.Item label="Restaurant">
                    <Select
                      style={{ width: "100%", minWidth: "max-content" }}
                      allowClear
                      placeholder="Select Restaurant"
                    >
                      {tenantsList &&
                        tenantsList.map((tenant: ITenantData) => {
                          return (
                            <Select.Option key={tenant.id}>
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

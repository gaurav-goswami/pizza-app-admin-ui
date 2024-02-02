import { Card, Col, Form, Input, Row, Space } from "antd";

const TenantForm = () => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Space direction="vertical" size="large">
            <Card title="Restaurant Information" bordered={false}>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Name is required",
                      },
                    ]}
                  >
                    <Input size="middle" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Address is required",
                      },
                    ]}
                  >
                    <Input size="middle" />
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

export default TenantForm;

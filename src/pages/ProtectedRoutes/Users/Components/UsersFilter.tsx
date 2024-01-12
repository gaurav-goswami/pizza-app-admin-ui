import { Button, Card, Col, Input, Row, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;

const UsersFilter = () => {
  return (
    <>
      <Card>
        <Row justify="space-between">
          <Col span={16}>
            <Row gutter={20}>
              <Col span={8}>
                <Search />
              </Col>
              <Col span={4}>
                <Select
                  style={{ width: "100%" }}
                  allowClear
                  placeholder="Select Role"
                >
                  <Option value="admin">Admin</Option>
                  <Option value="manager">Manager</Option>
                  <Option value="customer">Customer</Option>
                </Select>
              </Col>
              <Col span={4}>
                <Select
                  style={{ width: "100%" }}
                  allowClear
                  placeholder="Select Status"
                >
                  <Option value="ban">Ban</Option>
                  <Option value="ative">Active</Option>
                </Select>
              </Col>
            </Row>
          </Col>
          <Col span={8} style={{ display: "flex", justifyContent: "end" }}>
            <Button icon={<PlusOutlined />}>
              Add user
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default UsersFilter;

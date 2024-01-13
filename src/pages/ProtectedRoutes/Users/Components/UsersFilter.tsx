import { Card, Col, Flex, Input, Row, Select } from "antd";

const { Search } = Input;
const { Option } = Select;

type TFilterType = {
  onFilterChange: (filterName: string, filterValue: string) => void;
  children: React.ReactNode;
};

const UsersFilter = ({ onFilterChange, children }: TFilterType) => {
  return (
    <>
      <Card>
        <Row justify="space-between">
          <Col span={16}>
            <Row gutter={20}>
              <Col span={8}>
                <Search
                  placeholder="Search"
                  onChange={(e) =>
                    onFilterChange("searchFilterQuery", e.target.value)
                  }
                  allowClear
                />
              </Col>
              <Flex gap="10px">
                <Select
                  style={{ width: "100%", minWidth: "max-content" }}
                  allowClear
                  placeholder="Select Role"
                  onChange={(selectValue) =>
                    onFilterChange("roleFilter", selectValue)
                  }
                >
                  <Option value="admin">Admin</Option>
                  <Option value="manager">Manager</Option>
                  <Option value="customer">Customer</Option>
                </Select>
                <Select
                  style={{ width: "100%", minWidth: "max-content" }}
                  allowClear
                  placeholder="Select Status"
                  onChange={(selectValue) =>
                    onFilterChange("statusFilter", selectValue)
                  }
                >
                  <Option value="ban">Ban</Option>
                  <Option value="ative">Active</Option>
                </Select>
              </Flex>
            </Row>
          </Col>
          <Col span={8} style={{ display: "flex", justifyContent: "end" }}>
            {children}
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default UsersFilter;

import { Card, Col, Input, Row } from "antd";

const { Search } = Input;

type TFilterType = {
  onFilterChange: (filterName: string, filterValue: string) => void;
  children: React.ReactNode;
};

const RestaurantFilter = ({ onFilterChange, children }: TFilterType) => {
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

export default RestaurantFilter;

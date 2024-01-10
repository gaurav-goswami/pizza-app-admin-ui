import {
  Button,
  Card,
  Col,
  Flex,
  List,
  Row,
  Skeleton,
  Space,
  Tag,
  Typography,
} from "antd";
import { useAuthStore } from "../../../store";
import dayjs from "dayjs";
import DashboardCard from "./Components/DashboardCard";
import { TDashboardCard } from "./types";
import { FaCartShopping } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { Link } from "react-router-dom";

const { Title } = Typography;
const currentNotation = () => {
  return dayjs().format("A");
};

const Dashboard = () => {
  const { user } = useAuthStore();

  const dashboardCardData: TDashboardCard[] = [
    {
      title: "Total orders",
      value: 120,
      icon: <FaCartShopping className="text-lg" />,
      color: "green",
    },
    {
      title: "Total Sales",
      value: "₹78,000",
      icon: <GiTakeMyMoney className="text-xl" />,
      color: "blue",
    },
  ];

  const list = [
    {
      OrderSummary: "Peperoni, Margarita ...",
      address: "Bandra, Mumbai",
      amount: 1200,
      status: "preparing",
      loading: false,
    },
    {
      OrderSummary: "Paneer, Chicken BBQ ...",
      address: "Balurghat, West bengal",
      amount: 2000,
      status: "on the way",
      loading: false,
    },
    {
      OrderSummary: "Paneer, Chicken BBQ ...",
      address: "Balurghat, West bengal",
      amount: 2000,
      status: "on the way",
      loading: false,
    },
    {
      OrderSummary: "Paneer, Chicken BBQ ...",
      address: "Balurghat, West bengal",
      amount: 2000,
      status: "on the way",
      loading: false,
    },
    {
      OrderSummary: "Paneer, Chicken BBQ ...",
      address: "Balurghat, West bengal",
      amount: 2000,
      status: "on the way",
      loading: false,
    },
    {
      OrderSummary: "Paneer, Chicken BBQ ...",
      address: "Balurghat, West bengal",
      amount: 2000,
      status: "on the way",
      loading: false,
    },
  ];

  return (
    <>
      <Flex gap="20px" vertical>
        <Title level={4}>
          {currentNotation() === "AM" ? "Good Morning" : "Good Evening"},{" "}
          {user?.firstName} {user?.lastName && user.lastName}{" "}
          {currentNotation() === "AM" ? "☀️" : "🌙"}
        </Title>

        <Flex gap="15px" className="flex-col xl:flex-row">
          <Flex gap="15px">
            {dashboardCardData.map((data, index) => (
              <DashboardCard key={index} data={data} />
            ))}
          </Flex>

          <Col xl={12} className="bg-white px-4 py-2 rounded-md" lg={16}>
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={list}
              renderItem={(item) => (
                <List.Item>
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                      title={
                        <a href="https://ant.design">{item.OrderSummary}</a>
                      }
                      description={item.address}
                    />
                    <Row style={{ flex: 1 }} justify="space-between">
                      <Col>
                        <Typography.Text strong>₹{item.amount}</Typography.Text>
                      </Col>
                      <Col>
                        <Tag color="volcano">{item.status}</Tag>
                      </Col>
                    </Row>
                  </Skeleton>
                </List.Item>
              )}
            />
            <div style={{ marginTop: 20 }}>
              <Button type="link">
                <Link to="/orders">See all orders</Link>
              </Button>
            </div>
          </Col>
        </Flex>
      </Flex>
    </>
  );
};

export default Dashboard;

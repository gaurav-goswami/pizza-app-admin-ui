import { Flex, Typography } from "antd";
import { useAuthStore } from "../../../store";
import dayjs from "dayjs";
import DashboardCard from "./Components/DashboardCard";
import { TDashboardCard } from "./types";
import { FaCartShopping } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";

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

  return (
    <>
      <Flex gap="20px" className="flex-col xl:flex-row">
        <Flex vertical gap="20px">
          <Title level={4}>
            {currentNotation() === "AM" ? "Good Morning" : "Good Evening"},{" "}
            {user?.firstName} {user?.lastName && user.lastName}{" "}
            {currentNotation() === "AM" ? "☀️" : "🌙"}
          </Title>
          <Flex gap="15px">
            {dashboardCardData.map((data, index) => (
              <DashboardCard key={index} data={data} />
            ))}
          </Flex>
        </Flex>

        <h1>Table here</h1>
      </Flex>
    </>
  );
};

export default Dashboard;

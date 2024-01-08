import { Typography } from "antd";
import { useAuthStore } from "../../../store";
import dayjs from "dayjs";

const { Title } = Typography;
const currentNotation = () => {
  return dayjs().format("A");
};

const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <>
      <div>
        <Title level={4}>
          {currentNotation() === "AM" ? "Good Morning" : "Good Evening"},{" "}
          {user?.firstName} {user?.lastName && user.lastName}{" "}
          {currentNotation() === "AM" ? "☀️" : "🌙"}
        </Title>
      </div>
    </>
  );
};

export default Dashboard;

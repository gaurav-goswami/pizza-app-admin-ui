import { Flex, Tag, Typography, theme } from "antd";
import { FONTS } from "../../../../styles/theme";
import { TDashboardCard } from "../types";

const { Title, Text } = Typography;

const DashboardCard = ({ data }: { data: TDashboardCard }) => {
  const { title, value, icon, color } = data;

  return (
    <>
      <Flex
        vertical
        className="py-1.5 px-2 bg-white w-[250px] rounded-md"
        gap="10px"
      >
        <Flex gap="5px" align="center">
          <Tag className="py-1.5 px-2 rounded-md" color={color}>
            {icon}
          </Tag>
          <Text className="font-semibold" style={{ fontSize: FONTS.md }}>
            {title}
          </Text>
        </Flex>
        <Title level={2} className="pl-12">
          {value}
        </Title>
      </Flex>
    </>
  );
};

export default DashboardCard;

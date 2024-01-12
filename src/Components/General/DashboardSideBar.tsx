import {
  Avatar,
  Badge,
  Breadcrumb,
  Dropdown,
  Flex,
  Layout,
  Menu,
  Space,
  theme,
} from "antd";
import { ReactNode, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { DASHBOARD_ROUTES } from "../../utils/routeConstants";
import { FaUsers } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoBagCheck } from "react-icons/io5";
import { GiKnifeFork } from "react-icons/gi";
import { FaGift } from "react-icons/fa6";
import { BellFilled } from "@ant-design/icons";
import useLogout from "../../hooks/useLogout";
import { useAuthStore } from "../../store";
import { DASHBOARD_ALLOWED_ROLES } from "../../utils/constants";

const { Sider, Header, Footer, Content } = Layout;

const getMenuItems = (userRole: string) => {
  const baseItems = [
    {
      key: DASHBOARD_ROUTES.root,
      icon: <MdDashboard />,
      label: <NavLink to={DASHBOARD_ROUTES.root}>Home</NavLink>,
    },
    {
      key: DASHBOARD_ROUTES.restaurants,
      icon: <GiKnifeFork />,
      label: <NavLink to={DASHBOARD_ROUTES.restaurants}>Restaurant</NavLink>,
    },
    {
      key: DASHBOARD_ROUTES.products,
      icon: <IoBagCheck />,
      label: <NavLink to={DASHBOARD_ROUTES.products}>Products</NavLink>,
    },
    {
      key: DASHBOARD_ROUTES.promos,
      icon: <FaGift />,
      label: <NavLink to={DASHBOARD_ROUTES.promos}>Promos</NavLink>,
    },
  ];

  if (userRole && userRole === DASHBOARD_ALLOWED_ROLES.ADMIN) {
    const menu = [...baseItems];
    menu.splice(1, 0, {
      key: DASHBOARD_ROUTES.users,
      icon: <FaUsers />,
      label: <NavLink to={DASHBOARD_ROUTES.users}>Users</NavLink>,
    });
    return menu;
  }

  return baseItems;
};

const DashboardSideBar = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const { logoutUser } = useLogout();
  const { user } = useAuthStore();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = getMenuItems(user?.role as string);
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="light"
        >
          <div className="demo-logo-vertical">Logo here</div>
          <Menu
            theme="light"
            defaultSelectedKeys={["/"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: "0 16px", background: colorBgContainer }}>
            <Flex gap="middle" align="center" justify="space-between">
              <Badge
                text={
                  user?.role === DASHBOARD_ALLOWED_ROLES.ADMIN
                    ? "Admin"
                    : user?.tenant?.address
                }
                status="success"
              />
              <Space size={16}>
                <Badge dot>
                  <BellFilled />
                </Badge>
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "logout",
                        label: "Logout",
                        onClick: () => logoutUser(),
                      },
                    ],
                  }}
                  placement="bottomRight"
                >
                  <Avatar style={{ background: "#fde3cf", color: "#f56a00" }}>
                    G
                  </Avatar>
                </Dropdown>
              </Space>
            </Flex>
          </Header>
          <Content style={{ margin: "10px 15px" }}>
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              <Breadcrumb
                separator=">"
                items={[
                  {
                    title: (
                      <NavLink to={DASHBOARD_ROUTES.root}>Dashboard</NavLink>
                    ),
                  },
                  { title: pathname.replace("/", "") },
                ]}
              />
              {children}
            </Space>
          </Content>
          <Footer style={{ textAlign: "center" }}>Pizza App ©2024</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default DashboardSideBar;

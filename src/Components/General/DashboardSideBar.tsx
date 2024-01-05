import { Breadcrumb, Layout, Menu, theme } from "antd";
import { ReactNode, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { DASHBOARD_ROUTES } from "../../utils/routeConstants";
import { FaUsers } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoBagCheck } from "react-icons/io5";
import { GiKnifeFork } from "react-icons/gi";
import { FaGift } from "react-icons/fa6";

const { Sider, Header, Footer, Content } = Layout;
const DashboardSideBar = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {pathname} = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = [
    {
      key: DASHBOARD_ROUTES.root,
      icon: <MdDashboard />,
      label: <NavLink to={DASHBOARD_ROUTES.root}>Home</NavLink>,
    },
    {
        key: DASHBOARD_ROUTES.users,
        icon: <FaUsers />,
        label: <NavLink to={DASHBOARD_ROUTES.users}>Users</NavLink>
    },
    {
        key: DASHBOARD_ROUTES.restaurants,
        icon: <GiKnifeFork />,
        label: <NavLink to={DASHBOARD_ROUTES.restaurants}>Restaurant</NavLink>
    },
    {
        key: DASHBOARD_ROUTES.products,
        icon: <IoBagCheck />,
        label: <NavLink to={DASHBOARD_ROUTES.products}>Products</NavLink>
    },
    {
        key: DASHBOARD_ROUTES.promos,
        icon: <FaGift />,
        label: <NavLink to={DASHBOARD_ROUTES.promos}>Promos</NavLink>
    }
  ];

  console.log(pathname);
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
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
              <Breadcrumb.Item>{pathname.replace('/' , '')}</Breadcrumb.Item>
            </Breadcrumb>
            {children}
          </Content>
          <Footer style={{ textAlign: "center" }}>Pizza App ©2024</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default DashboardSideBar;

import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Typography } from "antd";
import ListMain from "../../components/ListMain";
import ModalFormPlat from "../../components/ModalFormPlat";

const Dashboard = () => {
  const { Header, Content, Footer, Sider } = Layout;
  const { Title } = Typography;
  const items = [UserOutlined].map((icon, index) => ({
    key: "1",
    icon: <UserOutlined />,
    label: `Dashboard`,
  }));
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo">
          <h1 style={{ color: "white", padding: "15px" }}>
            App plat kendaraan bermotor
          </h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              textAlign: "center",
            }}
          >
            <Title style={{ margin: "20px 10px" }}>
              List Kendaraan Bermotor
            </Title>
            <ModalFormPlat />
            <ListMain />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          <div>Ant Design ©2018 Created by Ant UED</div>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

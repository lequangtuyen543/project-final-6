import { NavLink } from "react-router-dom"
import { getCookie } from "../../helpers/cookie";
import { useSelector } from "react-redux";
import { Button, Space, Typography } from "antd";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

export const Header = (props) => {
  const { collapsed, setCollapsed } = props;
  const token = getCookie("token");
  const isLogin = useSelector((state) => state.loginReducer);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <header className="header">
        <NavLink to="/admin" className={collapsed ? "logo logo--collapsed" : "logo"}>
          <Title
            level={4}
            style={{ color: "#1677ff", margin: 0, fontWeight: 800 }}
          >
            {collapsed ? "ITA" : "IT Admin"}
          </Title>
        </NavLink>
        <div className="nav-wrap">
          <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <div className="account">
            {token ? (
              <Space>
                <NavLink to="/">
                  <Button>Home</Button>
                </NavLink>
                <NavLink to="/logout">
                  <Button>Log out</Button>
                </NavLink>
              </Space>
            ) : (
              <Space>
                <NavLink to="/login">
                  <Button>Login</Button>
                </NavLink>
                <NavLink to="/register">
                  <Button type="primary">Register</Button>
                </NavLink>
              </Space>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
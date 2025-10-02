import { NavLink } from "react-router-dom"
import { getCookie } from "../../helpers/cookie";
import { useSelector } from "react-redux";
import { Button, Space, Typography } from "antd";

const { Title } = Typography;

export const Header = () => {
  const token = getCookie("token");
  const isLogin = useSelector((state) => state.loginReducer);

  return (
    <header className="header">
      <div className="container">
        <NavLink to="/" className="logo">
          <Title
            level={3}
            style={{ color: "#1677ff", margin: 0, fontWeight: 800 }}
          >
            IT Jobs
          </Title>
        </NavLink>
        <div className="account">
          {token ? (
            <Space>
              <NavLink to="/admin/dashboard">
                <Button>Manager</Button>
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
  );
}
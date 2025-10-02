import { Link, NavLink } from "react-router-dom"
import { getCookie } from "../../helpers/cookie";
import { useSelector } from "react-redux";
import { Menu, Space, Typography } from "antd";
import { AppstoreOutlined, CompassOutlined, DashboardOutlined, MailOutlined, PaperClipOutlined, SettingOutlined, WechatWorkOutlined } from '@ant-design/icons';

const { Title } = Typography;

export const MenuSider = () => {
  const token = getCookie("token");
  const isLogin = useSelector((state) => state.loginReducer);

  const items = [
    {
      key: 'dashboard',
      label: <Link to="/admin/dashboard">Dashboard</Link>,
      icon: <DashboardOutlined />,
    },
    {
      key: 'manage-company',
      label: <Link to="/admin/manage-company">Manage Company</Link>,
      icon: <CompassOutlined />,
    },
    {
      key: 'manage-job',
      label: <Link to="/admin/manage-job">Manage Job</Link>,
      icon: <WechatWorkOutlined />,
    },
    {
      key: 'manage-cv',
      label: <Link to="/admin/manage-cv">Manage CV</Link>,
      icon: <PaperClipOutlined />,
    },
  ];

  return (
    <>
      <Menu
        // onClick={onClick}
        // style={{ width: 256 }}
        defaultSelectedKeys={['dashboard']}
        // defaultOpenKeys={['dashboard']}
        mode="inline"
        items={items}
        style={{height: '100%'}}
      />
    </>
  );
}
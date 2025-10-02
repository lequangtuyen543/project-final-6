import PrivateRoutes from "../components/PrivateRoutes";
import LayoutDefault from "../layout/client";
import { Company } from "../pages/client/Company";
import { CompanyDetail } from "../pages/client/CompanyDetail";
import Home from "../pages/client/Home";
import { JobDetail } from "../pages/client/JobDetail";
import Login from "../pages/client/Login";
import { Logout } from "../pages/client/Logout";
import Register from "../pages/client/Register";
import { Search } from "../pages/client/Search";
import LayoutAdmin from "../layout/admin";
import Dashboard from "../pages/admin/Dashboard";
import ManageCompany from "../pages/admin/ManageCompany";
import ManageJob from "../pages/admin/ManageJob";
import ManageCV from "../pages/admin/ManageCV";
import CreateJob from "../pages/admin/ManageJob/CreateJob";
import { DetailJobAdmin } from "../pages/admin/ManageJob/DetailJobAdmin";
import { DetailCVAdmin } from "../pages/admin/ManageCV/DetailCVAdmin";

export const routes = [
  // Public layout
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "logout", element: <Logout /> },
      { path: "register", element: <Register /> },
      { path: "search", element: <Search /> },
      { path: "job/:id", element: <JobDetail /> },
      { path: "company", element: <Company /> },
      { path: "company/:id", element: <CompanyDetail /> },
    ],
  },

  // Admin layout (protected)
  {
    path: "/admin",
    element: <PrivateRoutes />, // chỉ bọc bảo vệ ở đây
    children: [
      {
        element: <LayoutAdmin />, // layout admin riêng
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "manage-company", element: <ManageCompany /> },
          { path: "manage-job", element: <ManageJob /> },
          { path: "manage-cv", element: <ManageCV /> },
          { path: "create-job", element: <CreateJob /> },
          { path: "detail-job/:id", element: <DetailJobAdmin /> },
          { path: "detail-cv/:id", element: <DetailCVAdmin /> },
          // thêm route admin khác ở đây
        ],
      },
    ],
  },
];


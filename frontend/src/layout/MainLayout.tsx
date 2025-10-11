import { JSX } from "react";
import SideBar from "../components/Sidebar/Sidebar";
import TopBar from "../components/Topbar/Topbar";
import { Outlet } from "react-router-dom";
import "./MainLayout.css";

function MainLayout(): JSX.Element {
  return (
    <div className="layout">
      <TopBar username={"f"} />
      <div className="layout-body">
        <div className="layout-content">
          <Outlet />
        </div>
        <div className="layout-sidebar">
          <SideBar />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;

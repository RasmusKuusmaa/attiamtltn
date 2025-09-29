import { JSX, useContext } from "react";
import { TopBarContext } from "../context/TopBarcontext";
import SideBar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./MainLayout.css";

function MainLayout(): JSX.Element {
  const { content } = useContext(TopBarContext);

  return (
    <div className="layout">
      <div className="layout-topbar">{content}</div>
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
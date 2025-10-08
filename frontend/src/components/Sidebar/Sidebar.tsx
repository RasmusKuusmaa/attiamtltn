import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { JSX } from "react";

function SideBar(): JSX.Element {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <NavLink
              to="/main"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Main
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/stats"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Stats
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/notes"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Notes
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/projects"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Projects
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SideBar;

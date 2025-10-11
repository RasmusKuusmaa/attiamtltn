import { JSX, useContext } from "react";
import { TopBarContext } from "../../context/TopBarcontext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Topbar.css";

interface TopBarProps {
  username: string;
}

function TopBar({ username }: TopBarProps): JSX.Element {
  const { content } = useContext(TopBarContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="topbar">
      <div className="topbar-left">{content}</div>
      <div className="topbar-right">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default TopBar;

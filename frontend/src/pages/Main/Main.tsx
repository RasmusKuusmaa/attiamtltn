import { JSX, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/userService";

function Main(): JSX.Element {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  function handleLogout() {
    logout();
    navigate("/login");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    getCurrentUser(token)
      .then((data) => setUsername(data.username))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <h1>Hello {username}</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Main;

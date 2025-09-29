import { JSX, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {useNavigate } from "react-router-dom";
import { getCurrentUser, getUserTasks } from "../../services/userService";
import { Task } from "../../types/Task";
import { TopBarContext } from "../../context/TopBarcontext";



function Main(): JSX.Element {
  const {setContent} = useContext(TopBarContext);

  useEffect(() => {
    setContent(
      <div>
        <h2>
          das main page
        </h2>
        </div>
    )
  }, [])
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;


    //get username
    getCurrentUser(token)
      .then((data) => setUsername(data.username))
      .catch((err) => console.error(err));

    // get user tasks
    getUserTasks(token)
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));  
  }, []);



  return (
    <>
      <h1>Hello {username}</h1>
      <button onClick={handleLogout}>Logout</button>


      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <p>{task.title}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Main;

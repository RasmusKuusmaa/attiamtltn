import { JSX, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Main(): JSX.Element {
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogout(){
        logout();
        navigate("/login");
    }
    return (
        <>
        <h1>Main page</h1>
        <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Main;
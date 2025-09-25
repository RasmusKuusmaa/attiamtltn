import { JSX, useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/PreLogin/Login";
import Signup from "../pages/PreLogin/Signup";
import Main from "../pages/Main/Main";
import { AuthContext } from "../context/AuthContext";

function AppRoutes(): JSX.Element {
  const { isAuthenticated } = useContext(AuthContext);

  return (
        <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/main"
        element={isAuthenticated ? <Main /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
export default AppRoutes;

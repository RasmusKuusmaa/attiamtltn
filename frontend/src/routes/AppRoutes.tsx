import { JSX, useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/PreLogin/Login";
import Signup from "../pages/PreLogin/Signup";
import Main from "../pages/Main/Main";
import { AuthContext } from "../context/AuthContext";
import Stats from "../pages/Stats/Stats";
import MainLayout from "../layout/MainLayout";
import TopBarProvider from "../context/TopBarcontext";
import Notes from "../pages/Notes/Notes";
import Projects from "../pages/Projects/Projects";

function AppRoutes(): JSX.Element {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <TopBarProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {isAuthenticated ? (
          <Route element={<MainLayout />}>
            <Route
              path="/main"
              element={isAuthenticated ? <Main /> : <Navigate to="/login" />}
            />
            <Route
              path="/stats"
              element={isAuthenticated ? <Stats /> : <Navigate to="/login" />}
            />
            <Route
              path="/notes"
              element={isAuthenticated ? <Notes /> : <Navigate to="/notes" />}
            />

            <Route
              path="/projects"
              element={
                isAuthenticated ? <Projects /> : <Navigate to="/projects" />
              }
            />

            <Route path="*" element={<Navigate to="/main" />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </TopBarProvider>
  );
}
export default AppRoutes;

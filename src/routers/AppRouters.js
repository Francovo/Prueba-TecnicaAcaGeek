import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import RegistroData from "../components/Login-Registro/RegistroData";
import RegistroAdmin from "../components/Login-Registro/RegistroAdmin";
import LoginAdmin from "../components/Login-Registro/LoginAdmin";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Private from "./Private";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

const AppRouters = () => {
  const [checking, setChecking] = useState(true);
  const [logged, setLogged] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState("");

  useEffect(() => {    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user?.uid) {
        console.log(user);
        console.log("Logueado");
        setLogged(true);
      } else {
        console.log("no log");
        setLogged(false);
      }
      setChecking(false);
    });
  }, [setLogged, setChecking]);
  if (checking) {
    return <h1>Espere...</h1>;
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/RegistroData1"
            element={
              <PublicRoute isAuthenticated={logged}>
                <RegistroData />
              </PublicRoute>
            }
          />
          <Route
            path="/LoginAdmin"
            element={
              <PublicRoute isAuthenticated={logged}>
                <LoginAdmin />
              </PublicRoute>
            }
          />
          <Route
            path="/RegistroAdmin"
            element={
              <PublicRoute isAuthenticated={logged}>
                <RegistroAdmin />
              </PublicRoute>
            }
          />

          <Route
            path="/*"
            element={
              <PrivateRoute isAuthenticated={logged}>
                <Private />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRouters;

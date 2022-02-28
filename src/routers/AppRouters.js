import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import Listado from "../components/Tabla/Listado";
import RegistroData from "../components/Login-Registro/RegistroData";
import RegistroAdmin from "../components/Login-Registro/RegistroAdmin";
import LoginAdmin from "../components/Login-Registro/LoginAdmin";
import { GetUser } from "../components/Tabla/GetData";

const AppRouters = () => {
  return (
    <div>
        <Router>
            <Routes>
                <Route 
                path="/"
                element={
                    <RegistroData/>
                }/>
                <Route
                path="/Listado"
                element={
                    <Listado/>
                }
                />
                <Route
                path="/RegistroAdmin"
                element={
                    <RegistroAdmin/>
                }
                />
                <Route
                path="/LoginAdmin"
                element={
                    <LoginAdmin/>
                }
                />
                <Route
                path="/Detalles/:user"
                element={
                    <GetUser/>
                }
                />
            </Routes>
        </Router>
    </div>
  )
}

export default AppRouters
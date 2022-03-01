import React from "react";
import { Route, Routes } from "react-router-dom";
import { GetUser } from "../components/Tabla/GetData";
import Listado from "../components/Tabla/Listado";
import RegistroData from "../components/Login-Registro/RegistroData";


const Private = (isAuthenticated) => {
  return (
    <>
      <Routes>
      <Route path="/Listado" element={<Listado logged={isAuthenticated}/>} />
          <Route path="/Detalles/:user" element={<GetUser />} />
          <Route path="/RegistroData" element={<RegistroData logged={isAuthenticated}/>} />
      </Routes>
    </>
  );
};

export default Private;

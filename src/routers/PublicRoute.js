import { Navigate } from "react-router-dom";

export const PublicRoute = ({ isAuthenticated, children }) => {
  console.log(isAuthenticated);
  return !isAuthenticated ? children : <Navigate to="/Listado" />;
};

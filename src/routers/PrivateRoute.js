import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ isAuthenticated, children }) => {
  console.log(isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/RegistroData1" />;
};

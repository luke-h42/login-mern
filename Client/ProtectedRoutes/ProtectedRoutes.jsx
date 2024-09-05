import { Outlet, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function ProtectedRoutes() {
  const refreshToken = Cookies.get('token') 
  let auth = { token: refreshToken};
  console.log("In protected route, token:", refreshToken)
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
}
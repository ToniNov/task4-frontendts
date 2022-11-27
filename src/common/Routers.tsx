import { Navigate, Route, Routes } from "react-router-dom";
import { Path } from "./enum/path";
import { Login } from "../features/auth/ui/LogIn";
import { Signup } from "../features/auth/ui/Signup";
import { DataTable } from "../features/users/ui/DataTable";
import { Page404 } from "./Pages/Page404";

export const Routers = () => {
  return (
    <Routes>
      <Route path={Path.Other} element={<Page404 />} />
      <Route path={Path.Root} element={<Navigate to={Path.Users} />} />
      <Route path={Path.Users} element={<DataTable />} />
      <Route path={Path.Signup} element={<Signup />} />
      <Route path={Path.Login} element={<Login />} />
    </Routes>
  );
};

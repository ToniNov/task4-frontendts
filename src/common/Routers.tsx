import { Navigate, Route, Routes } from "react-router-dom";
import { Path } from "./enum/path";
import { useAppSelector } from "./hooks/hooks";
import { Login } from "../features/auth/ui/LogIn";
import { Signup } from "../features/auth/ui/Signup";
import { DataTable } from "../features/users/ui/DataTable";
import { selectorUserAuthName } from "../features/auth/bll/authSelectors";

export const Routers = () => {
  const isAuth = useAppSelector(selectorUserAuthName);

  const LOGIN = <Navigate to={`${Path.Login}`} />;
  const USERS = <Navigate to={`${Path.Users}`} />;

  return (
    <Routes>
      {/*<Route path={`${Path.Other}`} element={<Page404 />} />*/}
      <Route path={`${Path.Root}`} element={isAuth ? USERS : LOGIN} />
      <Route path={`${Path.Users}`} element={isAuth ? <DataTable /> : LOGIN} />
      <Route path={`${Path.Signup}`} element={isAuth ? USERS : <Signup />} />
      <Route path={`${Path.Login}`} element={isAuth ? USERS : <Login />} />
    </Routes>
  );
};

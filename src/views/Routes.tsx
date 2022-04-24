import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute, { PrivateRouteProps } from "./Routes/PrivateRoute";
import ProtectedRoute, { ProtectedRouteProps } from "./Routes/ProtectedRoute";

//Open route components
import Login from "./Login";
import Register from "./Register";

//Private route components
import Dashboard from "./Dashboard";
import Upload from "components/Dashboard/Routes/Upload";
import Drive from "components/Dashboard/Routes/Drive";

const defaultPrivateRouteProps: Omit<PrivateRouteProps, "outlet"> = {
  authenticationPath: "/entrar",
};

const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
  authenticationPath: "/meu-drive",
};

const RoutesContent = () => {
  return (
    <Routes>
      <Route
        path="/entrar"
        element={
          <ProtectedRoute outlet={<Login />} {...defaultProtectedRouteProps} />
        }
      />

      <Route
        path="/registro"
        element={
          <ProtectedRoute
            outlet={<Register />}
            {...defaultProtectedRouteProps}
          />
        }
      />

      <Route
        path="/"
        element={
          <PrivateRoute outlet={<Dashboard />} {...defaultPrivateRouteProps} />
        }
      >
        <Route path="meu-drive" element={<Drive />}></Route>
        <Route path="upload" element={<Upload />}></Route>
      </Route>

      <Route path="*" element={<Navigate to="/meu-drive" />} />
    </Routes>
  );
};

export default RoutesContent;

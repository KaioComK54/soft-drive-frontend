import React from "react";

import { UserContexProvider } from "./UserContext";
import { UserFileContexProvider } from "./UserFileContext";
import { AlertContexProvider } from "./AlertContext";

const GlobalContext: React.FC = ({ children }) => {
  return (
    <UserContexProvider>
      <UserFileContexProvider>
        <AlertContexProvider>{children}</AlertContexProvider>
      </UserFileContexProvider>
    </UserContexProvider>
  );
};

export default GlobalContext;

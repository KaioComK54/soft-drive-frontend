import React from "react";
import ReactDOM from "react-dom";

import { GlobalStyles } from "styles/_global.style";
import { BrowserRouter } from "react-router-dom";

import GlobalContext from "context";

import RoutesContent from "./views/Routes";
import Alert from "components/Alert";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <BrowserRouter>
      <GlobalContext>
        <RoutesContent />
        <Alert />
      </GlobalContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Usuarios from "./pages/Usuarios";
import Formulario from "./pages/Formulario";
import StoreProvider from "./components/Store/Provider";
import RoutesPrivate from "./components/Routes/Private";

const Routes = () => {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Route path="/" exact component={Login} />
        <RoutesPrivate path="/usuarios" exact component={Usuarios} />
        <RoutesPrivate path="/usuario_cadastro" exact component={Formulario} />
        <RoutesPrivate
          path="/usuario_cadastro/:id"
          exact
          component={Formulario}
        />
      </StoreProvider>
    </BrowserRouter>
  );
};

export default Routes;

import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Componente from "./components";

class Router extends Component {
  render() {
    return (      
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Componente} />         
        </Switch>
      </HashRouter>
    );
  }
}

export default Router;

import * as React from "react";
import { Route, Switch } from "react-router";
import Blog from "containers/Blog";
import Add from "containers/Add";

const routes = (
  <Switch>
    <Route exact path="/Add" component={Add} />
    <Route path="/" component={Blog} />
  </Switch>
);

export default routes;

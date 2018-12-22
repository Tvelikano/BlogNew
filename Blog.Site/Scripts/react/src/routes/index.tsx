import * as React from "react";
import { Route, Switch } from "react-router";
import RecordsContainer from "containers/RecordsContainer";
import AddContainer from "containers/AddContainer";

const routes = (
  <Switch>
    <Route exact path="/Add" component={AddContainer} />
    <Route path="/" component={RecordsContainer} />
  </Switch>
);

export default routes;

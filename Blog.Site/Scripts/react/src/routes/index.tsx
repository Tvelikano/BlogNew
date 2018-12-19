import * as React from "react";
import { Route, Switch } from "react-router";
import RecordsContainer from "../containers/RecordsContainer";

const routes = (
  <div>
    <Switch>
      <Route path="/" component={RecordsContainer} />
    </Switch>
  </div>
);

export default routes;

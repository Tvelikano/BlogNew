import * as React from "react";
import { Route, Switch } from "react-router";
import Blog from "Containers/Blog";
import Add from "Containers/Add";
import Login from "Containers/Login";
import Register from "Containers/Register";
import AdminRecords from "Containers/AdminRecords";
import AdminUsers from "Containers/AdminUsers";
import AdminRoles from "Containers/AdminRoles";
import Edit from "Containers/Edit";

const routes = (
  <Switch>
    <Route exact path="/Add" component={Add} />
    <Route exact path="/Login" component={Login} />
    <Route exact path="/Register" component={Register} />
    <Route exact path="/Admin/Records" component={AdminRecords} />
    <Route exact path="/Admin/Records/Edit/:id" component={Edit} />
    <Route exact path="/Admin/Users" component={AdminUsers} />
    <Route exact path="/Admin/Roles" component={AdminRoles} />
    <Route path="/" component={Blog} />
  </Switch>
);

export default routes;

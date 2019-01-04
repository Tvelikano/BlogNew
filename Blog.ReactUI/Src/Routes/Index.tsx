import * as React from "react";
import { Route, Switch } from "react-router";
import Blog from "Containers/Records/Blog";
import Add from "Containers/Records/Add";
import Login from "Containers/Account/Login";
import Register from "Containers/Account/Register";
import AdminRecords from "Containers/Admin/Records/Records";
import AdminRecordsAdd from "Containers/Admin/Records/Add";
import AdminRecordsEdit from "Containers/Admin/Records/Edit";
import AdminUsers from "Containers/Admin/Users/Users";
import AdminUsersAdd from "Containers/Admin/Users/Add";
import AdminUsersEdit from "Containers/Admin/Users/Edit";
import AdminRoles from "Containers/Admin/Roles/Roles";
import AdminRolesAdd from "Containers/Admin/Roles/Add";

const routes = (
  <Switch>
    <Route exact path="/Add" component={Add} />
    <Route exact path="/Login" component={Login} />
    <Route exact path="/Register" component={Register} />
    <Route exact path="/Admin/Records" component={AdminRecords} />
    <Route exact path="/Admin/Records/Add" component={AdminRecordsAdd} />
    <Route exact path="/Admin/Records/Edit/:id" component={AdminRecordsEdit} />
    <Route exact path="/Admin/Users" component={AdminUsers} />
    <Route exact path="/Admin/Users/Add" component={AdminUsersAdd} />
    <Route exact path="/Admin/Users/Edit/:id" component={AdminUsersEdit} />
    <Route exact path="/Admin/Roles" component={AdminRoles} />
    <Route exact path="/Admin/Roles/Add" component={AdminRolesAdd} />
    <Route path="/" component={Blog} />
  </Switch>
);

export default routes;

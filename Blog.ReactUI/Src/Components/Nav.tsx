import * as React from "react";
import { Link } from "react-router-dom";

interface IProps {
  isAuthenticated: boolean;
}

const Nav = (props: IProps) => (
  <nav className="navbar bg-dark">
    <div className="container">
      <Link to="/" className="navbar-brand">
        Blog
      </Link>
      {props.isAuthenticated ? (
        <>
          Hello
          <Link to="/Logout">Log Out</Link>
        </>
      ) : (
        <>
          <Link to="/Login">Log In</Link>
          <Link to="/Register">Sign Up</Link>
        </>
      )}

      <Link to="/Admin/Records">Records</Link>
      <Link to="/Admin/Users">Users</Link>
      <Link to="/Admin/Roles">Roles</Link>
    </div>
  </nav>
);

export default Nav;

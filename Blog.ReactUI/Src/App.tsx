import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import * as React from "react";
import routes from "Routes/Index";
import Nav from "Components/Nav";

interface IProps {
  history: History;
}

const App = ({ history }: IProps) => (
  <ConnectedRouter history={history}>
    <>
      <Nav isAuthenticated={false} />
      <div className="container">{routes}</div>
    </>
  </ConnectedRouter>
);

export default App;

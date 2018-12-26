import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import * as React from "react";
import routes from "routes/Index";

interface IProps {
  history: History;
}

const App = ({ history }: IProps) => (
  <ConnectedRouter history={history}>{routes}</ConnectedRouter>
);

export default App;

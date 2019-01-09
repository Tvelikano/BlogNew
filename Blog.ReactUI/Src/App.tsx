import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import * as React from "react";
import routes from "Routes/Index";
import Nav from "Containers/Nav";
import Footer from "Components/Footer";

interface IProps {
  history: History;
}

const App = ({ history }: IProps) => (
  <ConnectedRouter history={history}>
    <>
      <Nav />
      <div className="bg-light">
        <div className="container flex-fill py-3">{routes}</div>
      </div>
      <Footer />
    </>
  </ConnectedRouter>
);

export default App;

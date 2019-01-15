import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import * as React from "react";
import routes from "Routes/Index";
import Nav from "Containers/Nav";
import Footer from "Components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

interface IProps {
  history: History;
}

const App = ({ history }: IProps) => (
  <ConnectedRouter history={history}>
    <>
      <Nav />
      <ToastContainer position="bottom-right" />
      <div>{routes}</div>
      <Footer />
    </>
  </ConnectedRouter>
);

export default App;

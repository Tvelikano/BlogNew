import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import * as React from "react";
import routes from "Routes/Index";
import Nav from "Containers/Nav";
import Footer from "Components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Startup from "Startup";
import Loader from "Components/Helpers/Loader";
import Progress from "Components/Helpers/Progress";

interface IProps {
  history: History;
}

const App = ({ history }: IProps) => (
  <ConnectedRouter history={history}>
    <>
      <Loader />
      <Startup>
        <Nav />
        <ToastContainer position="bottom-right" />
        <div className="position-relative bg-light">
          <Progress />
          {routes}
        </div>
        <Footer />
      </Startup>
    </>
  </ConnectedRouter>
);

export default App;

import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import * as React from "react";
import routes from "Routes/Index";
import Nav from "Containers/Nav";
import Footer from "Components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

console.log("fппаваds");
interface IProps {
  history: History;
}

const App = ({ history }: IProps) => (
  <ConnectedRouter history={history}>
    <>
      <Nav />
      <button onClick={() => toast("Wow so easy !")}>Notify !</button>
      <ToastContainer />
      <div>{routes}</div>
      <Footer />
    </>
  </ConnectedRouter>
);

export default App;

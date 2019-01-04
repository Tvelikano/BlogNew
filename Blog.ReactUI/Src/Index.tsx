import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "App";
import { history, store } from "Store/ConfigureStore";

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById("root")
);

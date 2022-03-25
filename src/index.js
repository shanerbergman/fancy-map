import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
//import throttledMiddleware from "./middleware/throttle";
import reducers from "./reducers/index";
import App from "./App";

const store = createStore(
  reducers,
  composeWithDevTools(
    //applyMiddleware(throttledMiddleware)
    // other store enhancers if any
  )
);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app") || document.createElement("div")
);
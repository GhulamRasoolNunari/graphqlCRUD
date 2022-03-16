import ReactDOM from "react-dom";
import "./index.css";
import "sweetalert2/dist/sweetalert2.min.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import React from "react";

ReactDOM.render(
  <ApolloProvider client={client}>
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>
  </ApolloProvider>
  ,
  document.getElementById("root")
);

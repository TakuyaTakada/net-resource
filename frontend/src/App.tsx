import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Layout from "./components/Layout/Layout";

const client = new ApolloClient({
  uri: "/query"
});

const App: React.FC = (): JSX.Element => {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <SnackbarProvider maxSnack={3}>
            <Layout />
          </SnackbarProvider>
        </Router>
      </ApolloProvider>
    </div>
  );
};

export default App;

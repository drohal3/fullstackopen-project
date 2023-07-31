import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import store from "./utils/store";
import { Provider } from "react-redux";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(window.localStorage.getItem('UATalkUser'))
  console.log("token", token.token)
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token.token}` : null,
    }
  }
})

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_URI })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);
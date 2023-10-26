import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { RefreshContextProvider } from './Context/refreshContext';
import { HEADER_CONFIG } from './Constant';

const endpointUrl = 'https://graph.dev.jit.care/graphql';

// Create a GraphQL client
const client = new ApolloClient({
  uri: endpointUrl,
  cache: new InMemoryCache(),
  headers: {
    Authorization: HEADER_CONFIG.AuthCode,
  },
});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RefreshContextProvider>
  <ApolloProvider client={client}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ApolloProvider>
  </RefreshContextProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

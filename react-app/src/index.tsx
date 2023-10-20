import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const endpointUrl = 'https://graph.dev.jit.care/graphql';

// Create a GraphQL client
const client = new ApolloClient({
  uri: endpointUrl,
  cache: new InMemoryCache(),
  headers: {
    Authorization: 'Bearer eyJraWQiOiIzZ1U3bzFFVkg2bTJKY3AxXC9TVWpMYTlIQUJFelluQUx6QXNPS0lLNDE4Zz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyNDdlYTcxZC0wZGVkLTRlNTMtODQ4NS1iMjIyNTk4OWU4ZmUiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbl82OTI2MjdlZi1mZGE4LTQyMDMtYjEwOC1lOGU5ZjUyYWQ0MTAiLCJ0ZW5hbnRfNjkyNjI3ZWYtZmRhOC00MjAzLWIxMDgtZThlOWY1MmFkNDEwIiwidGVuYW50Xzk0MGU4ZWRmLWVkZDktNDAxZC1hMjFhLTEwZjg2NmZiZGIzZiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9VYXFsdUxPaHEiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIxcDNoNG1rc2ZhdWU0cThqbjQ3dWZlYm9yIiwib3JpZ2luX2p0aSI6IjdkNjk5Y2EwLWU2YTYtNDZlNS1hOTkwLWU2ODA4ZWY4MzZkNiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoicGhvbmUgZ3Jhdml0eVwvZ3JhcGhxbCBvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE2OTc2MTc5NjcsImV4cCI6MTY5Nzg3NDY3NSwiaWF0IjoxNjk3Nzg4Mjc1LCJqdGkiOiI2NzlhYTQ1OC0xZTdlLTQyZTAtODA1MC1iODllMzI1ZmI4YjAiLCJ1c2VybmFtZSI6InByYXNhbm5hLXBtIn0.JO20cznel1PCbYaRL015JzuSYiUSSxtFy8j6-u_vzjMw65N32DTJBV6IMlqzvjo2gMX5EFgvlfkfT_cs-nYof91ToHpY9vVGq5KFt-fjjYwxI_nWmGdHf1hGKaVWVqLS36jJ4eHfP_dN0RXhGmWMasoG46XxS6s8tayp_eALCaCStr95JelhnyfJwNbgxb9eMAYNWyplrh_eKV-lYQzNrRKMcbJvDYIk_Xirhv-Kma2z2sNSxQzx70_zxbga5HzOBDwstOEeQk4d93A_bAhfm28C5s6AvlZDqdu_yMLNxdiFTmIgxEzgGVHjHSvVLtQp9NDa268teL-2ZCsI94PiWA',
  },
});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

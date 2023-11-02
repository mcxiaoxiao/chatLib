import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';


// 后端服务器接口
const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  </React.StrictMode>,
)

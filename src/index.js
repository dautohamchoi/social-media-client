import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider, InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter } from 'react-router-dom';
import { createUploadLink } from 'apollo-upload-client';

// const cache = new InMemoryCache({
//   typePolicies: {
//     User: {
//       keyFields: ["name", "email", "password", "token", "phoneNumber", "status", "imageUser", "followers", "followingPeople", "posts", "comments"],
//     },
//     Post: {
//       keyFields: ["userId", "contentPost", "imagePost", "likeCount", "comments"],
//     },
//     Comment: {
//       keyFields: ["userId", "postId", "contentCmt", "likeCount"],
//     },
//   },
// });


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    }
  }
});
const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: '/graphql',
  cache,
  link: createUploadLink(),
});

// const client = new ApolloClient({
//   uri: authLink.concat(httpLink),
//   cache
// });



ReactDOM.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


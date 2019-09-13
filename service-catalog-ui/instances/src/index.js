import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';

import './index.css';

import App from './components/App/App';

import builder from './commons/builder';

import { createApolloClient } from './store';

// TODO MOVE DEPS TO OUTER PACKAGE.JSON

(async () => {
  await builder.init();

  const client = createApolloClient();

  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root'),
  );
})();

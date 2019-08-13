import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import { BackendModuleDisabled } from '@kyma-project/react-components';

import './index.css';

import { backendModuleExists } from './commons/helpers';
import App from './components/App/App.container';

import builder from './commons/builder';

import { createApolloClient } from './store';

class AppWrapper extends React.Component {
  render() {
    const client = createApolloClient();
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}

(async () => {
  await builder.init();
  ReactDOM.render(
    <>
      {backendModuleExists('servicecatalog') ? (
        <AppWrapper />
      ) : (
        <BackendModuleDisabled mod="Service Catalog" />
      )}
    </>,
    document.getElementById('root'),
  );
})();

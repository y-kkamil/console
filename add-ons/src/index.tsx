import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo-hooks';
import { BackendModuleDisabled } from '@kyma-project/react-components';

import App from './core/App';
import 'fiori-fundamentals/dist/fiori-fundamentals.min.css';

import nestServices from './services/nest';
import {
  NotificationsProvider,
  QueriesProvider,
  MutationsProvider,
  SubscriptionsProvider,
  FiltersProvider,
  ConfigurationsProvider,
  LabelsProvider,
  UrlsProvider,
} from './services';

import {
  BACKEND_MODULE_SERVICE_CATALOG,
  BACKEND_MODULE_SERVICE_CATALOG_DISPLAY_NAME,
} from './constants';

import appInitializer from './core/app-initializer';
import { createApolloClient } from './core/apollo-client';

const Services = nestServices(
  NotificationsProvider,
  QueriesProvider,
  MutationsProvider,
  FiltersProvider,
  ConfigurationsProvider,
  LabelsProvider,
  UrlsProvider,
  SubscriptionsProvider,
);

const AppWrapper: React.FunctionComponent = () => {
  const client = createApolloClient();
  return (
    <ApolloProvider client={client}>
      <Services>
        <App />
      </Services>
    </ApolloProvider>
  );
};

(async () => {
  await appInitializer.init();
  ReactDOM.render(
    <>
      {appInitializer.backendModuleExists(BACKEND_MODULE_SERVICE_CATALOG) ? (
        <AppWrapper />
      ) : (
        <BackendModuleDisabled
          mod={BACKEND_MODULE_SERVICE_CATALOG_DISPLAY_NAME}
        />
      )}
    </>,
    document.getElementById('root'),
  );
})();

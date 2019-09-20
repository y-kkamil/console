import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { NotificationProvider } from '../../contexts/notifications';
import HelloKyma from '../HelloKyma';

export default function App() {
  return (
    <NotificationProvider>
      <Switch>
        <Route path="/" component={HelloKyma} />
      </Switch>
    </NotificationProvider>
  );
}

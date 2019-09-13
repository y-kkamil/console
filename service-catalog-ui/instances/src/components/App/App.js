import React, { useState } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { Notification, Modal } from '@kyma-project/react-components';

import { TnotificationsProvider } from './NotificationContext/notification.context';

import ServiceInstanceDetails from '../ServiceInstanceDetails/ServiceInstanceDetails';
import ServiceInstancesList from '../ServiceInstancesList/ServiceInstancesList';

const NOTIFICATION_VISIBILITY_TIME = 5000;

export default function App() {
  const [notificationData, setNotificationData] = useState({});

  const openNotification = data => {
    setNotificationData({ open: true, ...data });
    setTimeout(() => {
      setNotificationData({ open: false });
    }, NOTIFICATION_VISIBILITY_TIME);
  };

  return (
    <TnotificationsProvider
      value={{
        open: data => {
          openNotification(data);
        },
      }}
    >
      <>
        {notificationData.open && <Notification {...notificationData} />}
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ServiceInstancesList} />
            <Route
              exact
              path="/details/:name"
              component={ServiceInstanceDetails}
            />
          </Switch>
        </BrowserRouter>
      </>
    </TnotificationsProvider>
  );
}

import React, { createContext, useContext, useState } from 'react';
import { Notification } from '@kyma-project/react-components';

const DEFAULT_NOTIFICATION_VISIBILITY_TIME = 35000;

const defaultState = {
  isOpen: false,
  notify: () => {},
  visibilityTime: DEFAULT_NOTIFICATION_VISIBILITY_TIME,
};

export const Index = createContext(defaultState);

export const NotificationProvider = ({ children, visibilityTime }) => {
  const [notificationData, setNotificationData] = useState({
    ...defaultState,
    visibilityTime,
  });
  return (
    <Index.Provider
      value={{
        ...notificationData,
        notify: function(
          data,
          visibilityTime = notificationData.visibilityTime,
        ) {
          setNotificationData({ isOpen: true, data });
          setTimeout(() => {
            setNotificationData({ isOpen: false });
          }, visibilityTime);
        },
      }}
    >
      {notificationData.isOpen ? (
        <Notification
          {...notificationData.data}
          onclick={setNotificationData({ isOpen: false })}
        />
      ) : null}
      {children}
    </Index.Provider>
  );
};

export function useNotification() {
  return useContext(Index);
}

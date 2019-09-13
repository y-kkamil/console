import React, { createContext } from 'react';

const Tnotifications = createContext({});

export const TnotificationsProvider = Tnotifications.Provider;
export const TnotificationsConsumer = Tnotifications.Consumer;
export default Tnotifications;

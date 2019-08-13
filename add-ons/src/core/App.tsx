import React from 'react';

import Notification from '../components/Notification/Notification.container';
import Toolbar from '../components/Toolbar/Toolbar.component';
import Table from '../components/Table/Table.container';

import { Wrapper } from './styled';

const App: React.FunctionComponent = () => (
  <Wrapper>
    <Notification />
    <Toolbar />
    <Table />
  </Wrapper>
);
export default App;

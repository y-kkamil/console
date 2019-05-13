import React from 'react';
import { Status, StatusWrapper } from './styled';

const TabElementsIndicator = ({count}) => (
  <StatusWrapper>
    <Status>
      {count ? count : ''}
    </Status>
  </StatusWrapper>
);

export default TabElementsIndicator;
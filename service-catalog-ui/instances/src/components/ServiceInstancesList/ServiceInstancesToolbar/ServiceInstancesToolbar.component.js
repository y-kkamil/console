import React from 'react';

import { serviceInstanceConstants } from '../../../variables';
import { Toolbar } from '@kyma-project/react-components';

import SearchDropdown from './SearchDropdown.component';
import FilterDropdown from './FilterDropdown.component';

const ServiceInstancesToolbar = ({
  searchFn,
  availableLabels,
  filterFn,
  serviceInstancesExists,
}) => {
  return (
    <Toolbar background="#fff" title={serviceInstanceConstants.title}>
      {serviceInstancesExists ? (
        <>
          <SearchDropdown onChange={e => searchFn(e.target.value)} />
          <FilterDropdown
            onChange={null}
            filter={true}
            availableLabels={availableLabels}
          />
        </>
      ) : null}
    </Toolbar>
  );
};

export default ServiceInstancesToolbar;

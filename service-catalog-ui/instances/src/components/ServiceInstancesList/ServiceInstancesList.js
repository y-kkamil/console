import React, { useState, useEffect } from 'react';
import LuigiClient from '@kyma-project/luigi-client';

import { useQuery, useMutation } from '@apollo/react-hooks';

import builder from '../../commons/builder';
import { getAllServiceInstances } from '../../queries/queries';
import { deleteServiceInstance } from '../../queries/mutations';

import {
  NotificationMessage,
  Tab,
  Tabs,
  Tooltip,
  ThemeWrapper,
  instancesTabUtils,
} from '@kyma-project/react-components';
import { Counter } from 'fundamental-react';

import { serviceInstanceConstants } from '../../variables';
import ServiceInstancesTable from './ServiceInstancesTable/ServiceInstancesTable.component';
import ServiceInstancesToolbar from './ServiceInstancesToolbar/ServiceInstancesToolbar.component';

import { ServiceInstancesWrapper } from './styled';

const determineSelectedTab = () => {
  const selectedTabName = LuigiClient.getNodeParams().selectedTab;
  return instancesTabUtils.convertTabNameToIndex(selectedTabName);
};

const handleTabChange = ({ defaultActiveTabIndex }) => {
  const selectedTabName = instancesTabUtils.convertIndexToTabName(
    defaultActiveTabIndex,
  );

  LuigiClient.linkManager()
    .withParams({ selectedTab: selectedTabName })
    .navigate('');
};

export default function ServiceInstancesList() {
  const [addOnsToDisplay, setAddOnsToDisplay] = useState([]);
  const [servicesToDisplay, setServicesToDisplay] = useState([]);

  const [
    deleteServiceInstanceMutation,
    { deleteServiceMutationData },
  ] = useMutation(deleteServiceInstance);

  const { loading, error, data } = useQuery(getAllServiceInstances, {
    variables: {
      namespace: builder.getCurrentEnvironmentId(),
    },
  });

  const createInstancesLabelsList = visibleInstances => {};

  useEffect(() => {
    if (data && data.serviceInstances) {
      filterInstancesByName('');
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const filterInstancesByName = searchQuery => {
    const filtered = data.serviceInstances.filter(instance =>
      new RegExp(searchQuery, 'i').test(instance.name),
    );

    const addOns = filtered.filter(instance => {
      // ARE THESE CONDITIONS OK?
      if (instance.clusterServiceClass && instance.clusterServiceClass.labels) {
        return instance.clusterServiceClass.labels.local === 'true';
      }
      return false;
    });
    const services = filtered.filter(instance => {
      if (instance.clusterServiceClass && instance.clusterServiceClass.labels) {
        return instance.clusterServiceClass.labels.local !== 'true';
      }
      return true;
    });

    setAddOnsToDisplay(addOns);
    setServicesToDisplay(services);
  };

  const filterInstancesByLabels = labelsChecked => {
    console.log(labelsChecked);
  };

  const handleDelete = instanceName => {
    deleteServiceInstanceMutation({
      variables: {
        namespace: builder.getCurrentEnvironmentId(),
        name: instanceName,
      },
    });
  };

  return (
    <ThemeWrapper>
      <ServiceInstancesToolbar
        searchFn={filterInstancesByName}
        filterFn={filterInstancesByLabels}
        serviceInstancesExists={data.serviceInstances.length > 0}
      />

      <NotificationMessage
        type="error"
        title="Error"
        message={null} //TODO
      />

      <Tabs
        defaultActiveTabIndex={determineSelectedTab()}
        callback={handleTabChange}
        borderType="none"
        noMargin
        customStyles={`background-color: #fff;
          padding: 0 15px;`}
        hideSeparator
      >
        <Tab
          noMargin
          status={addOnsToDisplay.length}
          title={
            <Tooltip
              content={serviceInstanceConstants.addonsTooltipDescription}
              minWidth="100px"
              showTooltipTimeout={750}
              key="instances-addons-tab-tooltip"
            >
              {serviceInstanceConstants.addons}
            </Tooltip>
          }
        >
          <ServiceInstancesWrapper data-e2e-id="instances-wrapper">
            <ServiceInstancesTable
              data={addOnsToDisplay}
              deleteServiceInstance={handleDelete}
            />
          </ServiceInstancesWrapper>
        </Tab>
        <Tab
          noMargin
          status={servicesToDisplay.length}
          title={
            <Tooltip
              content={serviceInstanceConstants.servicesTooltipDescription}
              minWidth="140px"
              showTooltipTimeout={750}
              key="instances-services-tab-tooltip"
            >
              {serviceInstanceConstants.services}
            </Tooltip>
          }
        >
          <ServiceInstancesWrapper data-e2e-id="instances-wrapper">
            <ServiceInstancesTable
              data={servicesToDisplay}
              deleteServiceInstance={handleDelete}
            />
          </ServiceInstancesWrapper>
        </Tab>
      </Tabs>
    </ThemeWrapper>
  );
}

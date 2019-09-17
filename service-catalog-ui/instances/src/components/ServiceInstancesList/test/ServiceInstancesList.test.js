import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { mount } from 'enzyme';
import networkMock from './networkMock';

import ServiceInstancesList from '../ServiceInstancesList';
import { act } from 'react-dom/test-utils';

import { Spinner } from '@kyma-project/react-components';
import ServiceInstancesTable from '../ServiceInstancesTable/ServiceInstancesTable.component';
import { Link } from '../ServiceInstancesTable/styled.js';

const mockNavigate = jest.fn();

jest.mock('@kyma-project/luigi-client', () => {
  return {
    linkManager: function() {
      return {
        fromContext: function() {
          return {
            navigate: mockNavigate,
          };
        },
      };
    },
    getNodeParams: function() {
      return {
        selectedTab: 'addons',
      };
    },
  };
});

describe('Service Instances List list', () => {
  it('Shows loading indicator only when data is not yet loaded', async () => {
    await act(async () => {
      const component = mount(
        <MockedProvider addTypename={true} mocks={networkMock}>
          <ServiceInstancesList />
        </MockedProvider>,
      );

      expect(component.find(Spinner)).toHaveLength(1);

      await wait(0);
      component.update();

      expect(component.find(Spinner)).toHaveLength(0);
    });
  });

  it('Displays instances with their corresponding names in the table', async () => {
    await act(async () => {
      const component = mount(
        <MockedProvider addTypename={true} mocks={networkMock}>
          <ServiceInstancesList />
        </MockedProvider>,
      );

      await wait(0);
      component.update();

      const table = component.find(ServiceInstancesTable);
      expect(table.exists()).toBe(true);

      const tableProps = table.props();
      const rowData = tableProps.data;

      expect(rowData).toHaveLength(2);

      const displayedInstanceLinks = table
        .find('[data-e2e-id="instance-name"]')
        .find(Link);
      expect(displayedInstanceLinks).toHaveLength(2);

      const firstInstanceAnchor = displayedInstanceLinks.at(0).find('a');
      const secondInstanceAnchor = displayedInstanceLinks.at(1).find('a');

      expect(firstInstanceAnchor.exists()).toBe(true);
      expect(secondInstanceAnchor.exists()).toBe(true);
      expect(firstInstanceAnchor.text()).toEqual('redis-motherly-deposit');
      expect(secondInstanceAnchor.text()).toEqual('testing-curly-tax');
    });
  });

  it('Navigates to Service Catalog when clicked on "Add instance" button', async () => {
    await act(async () => {
      const component = mount(
        <MockedProvider addTypename={true} mocks={networkMock}>
          <ServiceInstancesList />
        </MockedProvider>,
      );

      await wait(0);
      component.update();

      const addInstanceButton = component
        .find('[data-e2e-id="add-instance"]')
        .find('button');
      expect(addInstanceButton.exists()).toBe(true);

      addInstanceButton.simulate('click');

      expect(mockNavigate).toHaveBeenCalledWith('cmf-service-catalog');
    });
  });

  it('Navigates to Instance details when clicked on Instance link', async () => {
    await act(async () => {
      const component = mount(
        <MockedProvider addTypename={true} mocks={networkMock}>
          <ServiceInstancesList />
        </MockedProvider>,
      );

      await wait(0);
      component.update();
      const instanceLink = component
        .find('[data-e2e-id="instance-name-testing-curly-tax"]')
        .find('a');
      expect(instanceLink.exists()).toBe(true);

      instanceLink.simulate('click');

      expect(mockNavigate).toHaveBeenCalledWith(
        'cmf-instances/details/testing-curly-tax',
      );
    });
  });
});

import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { mount } from 'enzyme';
import {
  serviceInstancesQuery,
  serviceInstancesSubscription,
  serviceInstancesSubscriptionEmpty,
  serviceInstanceDeleteMutation,
} from './networkMock';
import ServiceInstancesTable from '../ServiceInstancesTable/ServiceInstancesTable.component';

import { Button } from '@kyma-project/react-components';
import ServiceInstancesList from '../ServiceInstancesList';
import { act } from 'react-dom/test-utils';
import { Spinner } from '@kyma-project/react-components';
import { Link } from '../ServiceInstancesTable/styled.js';

const mockNavigate = jest.fn();
const mockAddBackdrop = jest.fn();
const mockRemoveBackdrop = jest.fn();

function mountWithModalBg(component) {
  return mount(
    <div className="modal-demo-bg">
      <span />
      {component}
    </div>,
    { attachTo: document.body },
  );
}

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
    uxManager: function() {
      return {
        addBackdrop: mockAddBackdrop,
        removeBackdrop: mockRemoveBackdrop,
      };
    },
  };
});

describe('InstancesList UI', () => {
  it('Shows loading indicator only when data is not yet loaded', async () => {
    const mocks = [serviceInstancesSubscriptionEmpty];
    await act(async () => {
      const component = mount(
        <MockedProvider addTypename={true} mocks={mocks}>
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
    const mocks = [serviceInstancesQuery, serviceInstancesSubscriptionEmpty];
    await act(async () => {
      const component = mount(
        <MockedProvider addTypename={true} mocks={mocks}>
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
    const mocks = [serviceInstancesQuery, serviceInstancesSubscriptionEmpty];
    await act(async () => {
      const component = mount(
        <MockedProvider addTypename={true} mocks={mocks}>
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
    const mocks = [serviceInstancesQuery, serviceInstancesSubscriptionEmpty];
    await act(async () => {
      const component = mount(
        <MockedProvider addTypename={true} mocks={mocks}>
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

  it(`Test deleting instances via subscription`, async () => {
    const mocks = [
      serviceInstancesQuery,
      serviceInstancesSubscription('DELETE'),
    ];
    let component = null;
    await act(async () => {
      component = mount(
        <MockedProvider addTypename={true} mocks={mocks}>
          <ServiceInstancesList />
        </MockedProvider>,
      );
      await wait(0); // wait for response
      await wait(0);
    });

    component.update();
    const table = component.find(ServiceInstancesTable);
    expect(table.exists()).toBe(true);
    expect(table.prop('data')).toHaveLength(1);
  });

  it(`Test adding instances via subscription`, async () => {
    const mocks = [serviceInstancesQuery, serviceInstancesSubscription('ADD')];
    let component = null;
    await act(async () => {
      component = mount(
        <MockedProvider addTypename={true} mocks={mocks}>
          <ServiceInstancesList />
        </MockedProvider>,
      );
      await wait(0); // wait for response
      await wait(0);
    });

    component.update();
    const table = component.find(ServiceInstancesTable);
    expect(table.exists()).toBe(true);
    expect(table.prop('data')).toHaveLength(3);
  });

  it(`Validate if modal delete button fires deleteMutation`, async () => {
    const mocks = [
      serviceInstancesQuery,
      serviceInstancesSubscription(),
      serviceInstanceDeleteMutation,
    ];
    let component = null;
    const deleteButtonSelector =
      'button[data-e2e-id="modal-confirmation-button"]';
    await act(async () => {
      component = mountWithModalBg(
        <MockedProvider addTypename={true} mocks={mocks}>
          <ServiceInstancesList />
        </MockedProvider>,
      );
      await wait(0); // wait for response
      await wait(0);
    });

    component.update();
    const table = component.find(ServiceInstancesTable);
    expect(table.exists()).toBe(true);
    expect(table.prop('data')).toHaveLength(2);

    const displayedInstanceLinks = table.find('tr').find(Button);

    expect(displayedInstanceLinks).toHaveLength(2);
    const firstInstanceButton = displayedInstanceLinks.at(0).find('button');

    expect(firstInstanceButton.exists()).toBe(true);

    firstInstanceButton.simulate('click');
    const deleteButton = component.find(deleteButtonSelector);

    expect(deleteButton.exists()).toBe(true);
    await act(async () => {
      deleteButton.simulate('click');
    });
    component.update();

    expect(component.find(deleteButtonSelector).exists()).toBe(false);
    expect(serviceInstanceDeleteMutation.result).toHaveBeenCalled();
  });
});

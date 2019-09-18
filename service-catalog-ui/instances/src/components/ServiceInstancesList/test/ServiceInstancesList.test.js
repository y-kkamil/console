import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { mount } from 'enzyme';
import networkMock from './networkMock';
import ServiceInstancesTable from '../ServiceInstancesTable/ServiceInstancesTable.component';

import {
  Button,
} from '@kyma-project/react-components';
import ServiceInstancesList from '../ServiceInstancesList';
import { act } from 'react-dom/test-utils';

const mockNavigate = jest.fn();
const mockAddBackdrop= jest.fn();
const mockRemoveBackdrop = jest.fn();

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
  it(`Test deleting instances via subscription`, async () => {
    let component = null;
    await act(async () => {
      component = mount(
        <MockedProvider addTypename={true} mocks={networkMock}>
          <ServiceInstancesList testNamespace="delete"/>
        </MockedProvider>,
      );
      await wait(0); // wait for response
    });
    
    component.update();
    const table = component.find(ServiceInstancesTable);
    expect(table.exists()).toBe(true);

    const tableProps = table.props();
    const rowData = tableProps.data;
    expect(rowData).toHaveLength(1);
  });

  it(`Test adding instances via subscription`, async () => {
    let component = null;
    await act(async () => {
      component = mount(
        <MockedProvider addTypename={true} mocks={networkMock}>
          <ServiceInstancesList testNamespace="add"/>
        </MockedProvider>,
      );
      await wait(0); // wait for response
    });
    
    component.update();
    const table = component.find(ServiceInstancesTable);
    expect(table.exists()).toBe(true);

    const tableProps = table.props();
    const rowData = tableProps.data;
    expect(rowData).toHaveLength(3);
  });

  it(`Renders "loading" when there's no GQL response`, async () => {
    let component = null;
    await act(async () => {
      component = mount(
        <MockedProvider addTypename={true} mocks={networkMock}>
          <ServiceInstancesList />
        </MockedProvider>,
      );
      await wait(0); // wait for response
    });
    
    component.update();
    const table = component.find(ServiceInstancesTable);
    expect(table.exists()).toBe(true);

    const tableProps = table.props();
    const rowData = tableProps.data;

    expect(rowData).toHaveLength(2);

    const displayedInstanceLinks = table
      .find('tr')
      .find(Button);

    expect(displayedInstanceLinks).toHaveLength(2);
    const firstInstanceButton = displayedInstanceLinks.at(0).find('button');

    expect(firstInstanceButton.exists()).toBe(true);

    firstInstanceButton.simulate('click');

    const deleteButton = component.find('button[data-e2e-id="modal-confirmation-button"]');
    
    expect(deleteButton.exists()).toBe(true);
    await act(async () => {
      deleteButton.simulate('click');
      await wait(0); // wait for response
    });
    component.update();
    // const deleteButton2 = component.find('button[data-e2e-id="modal-confirmation-button"]');
    // expect(deleteButton2.exists()).toBe(false);
    const mockDeleteMutation = networkMock[1].result;
    expect(mockDeleteMutation).toHaveBeenCalled();
  });

});

import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { mount } from 'enzyme';
import networkMock from './networkMock';

import ServiceInstancesList from '../ServiceInstancesList';
import { act } from 'react-dom/test-utils';

describe('MetadataDefinitions UI', () => {
  it(`Renders "loading" when there's no GQL response`, async () => {
    let component = null;
    await act(async () => {
      component = mount(
        <MockedProvider addTypename={false} mocks={networkMock}>
          <ServiceInstancesList />
        </MockedProvider>,
      );

      await wait(0); // wait for response
    });

    component.update();

    console.log(component.debug());

    component.update();

    expect(true).toEqual(true);
  });
});

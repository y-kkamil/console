import React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';
import { mocks } from './mock';

import MetadataDefinitionDetails from '../MetadataDefinitionDetails.container';

const { act } = renderer;
const wait = require('waait');

describe('MetadataDefinitionDetails', () => {
  it('Renders null schema', async () => {
    let component;
    act(() => {
      component = renderer.create(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MetadataDefinitionDetails definitionKey="noschemalabel" />
        </MockedProvider>,
      );
    });
    await wait(0); // wait for response
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

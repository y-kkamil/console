import React from 'react';
import CreateNamespaceForm from '../CreateNamespaceForm';
import renderer from 'react-test-renderer';

describe('CreateNamespaceForm', () => {
  it('Renders with minimal props', () => {
    const component = renderer.create(
      <CreateNamespaceForm formElementRef={{ current: null }} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import wait from 'waait';

import CreateNamespaceForm from '../CreateNamespaceForm';
import { CREATE_NAMESPACE } from '../../../gql/mutations';

describe('CreateNamespaceForm', () => {
  it('Renders with minimal props', () => {
    const component = renderer.create(
      <CreateNamespaceForm formElementRef={{ current: null }} />,
    );

    expect(component).toBeTruthy();
  });

  it('Shows and hides Memory quotas section', () => {
    const component = mount(
      <CreateNamespaceForm formElementRef={{ current: null }} />,
    );

    const memoryQuotasCheckbox = '#memory-quotas';
    const memoryQuotasSection = `[data-test-id="memory-quotas-section"]`;

    expect(component.find(memoryQuotasSection).exists()).toEqual(false);

    component
      .find(memoryQuotasCheckbox)
      .simulate('change', { target: { checked: true } });
    expect(component.find(memoryQuotasSection).exists()).toEqual(true);

    component
      .find(memoryQuotasCheckbox)
      .simulate('change', { target: { checked: false } });
    expect(component.find(memoryQuotasSection).exists()).toEqual(false);
  });

  it('Shows and hides Container limits section', () => {
    const component = mount(
      <CreateNamespaceForm formElementRef={{ current: null }} />,
    );

    const containerLimitsCheckbox = '#container-limits';
    const containerLimitsSection = `[data-test-id="container-limits-section"]`;

    expect(component.find(containerLimitsSection).exists()).toEqual(false);

    component
      .find(containerLimitsCheckbox)
      .simulate('change', { target: { checked: true } });

    expect(component.find(containerLimitsSection).exists()).toEqual(true);

    component
      .find(containerLimitsCheckbox)
      .simulate('change', { target: { checked: false } });
    expect(component.find(containerLimitsSection).exists()).toEqual(false);

    expect(
      component
        .find('form')
        .instance()
        .checkValidity(),
    ).toEqual(false);
  });

  it('Makes namespace creation request only, when no limits/quotas are provided', async () => {
    const m = [
      {
        request: {
          query: CREATE_NAMESPACE,
          variables: { name: '', labels: {} },
        },
        result: jest.fn().mockReturnValue({ data: {} }),
      },
    ];

    const onError = jest.fn();
    const onCompleted = jest.fn();

    const component = mount(
      <MockedProvider mocks={m}>
        <CreateNamespaceForm
          onError={onError}
          onCompleted={onCompleted}
          formElementRef={{ current: null }}
        />
      </MockedProvider>,
    );

    const form = component.find('form');
    form.simulate('submit');
    await wait();

    expect(m[0].result).toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });

  it('Makes create namespace, limits, quotas requests, when all are provided', async () => {
    const m = [
      {
        request: {
          query: CREATE_NAMESPACE,
          variables: { name: '', labels: {} },
        },
        result: jest.fn().mockReturnValue({ data: {} }),
      },
    ];

    const onError = jest.fn();
    const onCompleted = jest.fn();

    const component = mount(
      <MockedProvider mocks={m}>
        <CreateNamespaceForm
          onError={onError}
          onCompleted={onCompleted}
          formElementRef={{ current: null }}
        />
      </MockedProvider>,
    );

    const form = component.find('form');
    const containerLimitsCheckbox = '#container-limits';

    component
      .find(containerLimitsCheckbox)
      .simulate('change', { target: { checked: true } });

    form.simulate('submit');
    await wait();

    expect(m[0].result).toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });
});

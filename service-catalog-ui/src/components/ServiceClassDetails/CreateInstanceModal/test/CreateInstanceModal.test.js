import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { render } from '@testing-library/react';
import { componentUpdate, mockTestNamespace } from 'testing';
import {
  mockServiceClass,
  mockPlan,
  planWithImagePullPolicy,
} from 'testing/catalog/serviceClassesMocks';
import {
  createServiceInstanceSuccessfulMock,
  createServiceInstanceErrorMock,
  createServiceInstanceNoPlanSpecSuccessfulMock,
} from 'testing/catalog/queriesMocks';
import CreateInstanceModal from '../CreateInstanceModal.component';

const onCompleted = jest.fn();
const onError = jest.fn();
const onChange = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-shared', () => ({
  ...jest.requireActual('react-shared'),
  JSONEditor: () => null,
  Tooltip: () => null,
}));

jest.mock('@luigi-project/client', () => ({
  getContext: () => ({
    namespaceId: mockTestNamespace,
  }),
  linkManager: () => ({
    fromContext: () => ({
      navigate: mockNavigate,
    }),
  }),
}));

beforeEach(() => {
  onCompleted.mockReset();
  onError.mockReset();
  onChange.mockReset();
  mockNavigate.mockReset();
});

const consoleWarn = jest.spyOn(global.console, 'warn').mockImplementation();
afterAll(() => {
  consoleWarn.mockReset();
});

describe('CreateInstanceModal', () => {
  it('Renders with minimal props', () => {
    const component = renderer.create(
      <MockedProvider>
        <CreateInstanceModal
          setCustomValid={jest.fn()}
          checkInstanceExistQuery={{ serviceInstances: [] }}
          item={mockServiceClass(1, false, [mockPlan(1)])}
          formElementRef={{ current: null }}
          jsonSchemaFormRef={{ current: null }}
          onChange={onChange}
          onError={onError}
          onCompleted={onCompleted}
        />
      </MockedProvider>,
    );

    expect(component).toBeTruthy();
  });

  it('Shows filled instance name input, predefined dropdowns and does not allow to submit form', async () => {
    const mockService = mockServiceClass(1, false, [planWithImagePullPolicy]);
    const component = mount(
      <MockedProvider>
        <CreateInstanceModal
          setCustomValid={jest.fn()}
          checkInstanceExistQuery={{ serviceInstances: [] }}
          item={mockService}
          formElementRef={{ current: null }}
          jsonSchemaFormRef={{ current: null }}
          onChange={onChange}
          onError={onError}
          onCompleted={onCompleted}
        />
      </MockedProvider>,
    );

    await componentUpdate(component);
    await componentUpdate(component);

    const instanceNameSelector = 'input#instanceName';
    const instanceNameInput = component.find(instanceNameSelector);
    expect(instanceNameInput.exists()).toEqual(true);
    expect(instanceNameInput.instance().value).not.toEqual('');

    const instancePlanSelector = '#plan';
    const instancePlanInput = component.find(instancePlanSelector);
    expect(instancePlanInput.exists()).toEqual(true);
    expect(instancePlanInput.instance().value).toEqual(
      mockService.plans[0].name,
    );
    expect(instancePlanInput.props().children.length).toEqual(1);

    const instanceImagePullPolicySelector = 'select#root_imagePullPolicy';
    const instanceImagePullPolicyInput = component.find(
      instanceImagePullPolicySelector,
    );

    expect(instanceImagePullPolicyInput.exists()).toEqual(true);
    expect(instanceImagePullPolicyInput.instance().value).toEqual(
      'IfNotPresent',
    );

    expect(
      component
        .find('form#createInstanceForm')
        .instance()
        .checkValidity(),
    ).toEqual(true);
  });

  it('Does not allow to submit form with invalid instance name', async () => {
    const component = mount(
      <MockedProvider>
        <CreateInstanceModal
          setCustomValid={jest.fn()}
          checkInstanceExistQuery={{ serviceInstances: [] }}
          item={mockServiceClass(1, false, [planWithImagePullPolicy])}
          formElementRef={{ current: null }}
          jsonSchemaFormRef={{ current: null }}
          onChange={onChange}
          onError={onError}
          onCompleted={onCompleted}
        />
      </MockedProvider>,
    );

    await componentUpdate(component);
    await componentUpdate(component);

    const instanceNameInput = component.find('input#instanceName');
    instanceNameInput.instance().value = '';
    expect(instanceNameInput.instance().value).toEqual('');

    expect(
      component
        .find('form#createInstanceForm')
        .instance()
        .checkValidity(),
    ).toEqual(false);
  });

  it('Creates instance with plan spec', async () => {
    const ref = React.createRef();

    const mockService = mockServiceClass(1, false, [planWithImagePullPolicy]);

    const gqlMock = createServiceInstanceSuccessfulMock(mockService.name);

    const component = mount(
      <MockedProvider mocks={[gqlMock]} addTypename={false}>
        <CreateInstanceModal
          setCustomValid={jest.fn()}
          checkInstanceExistQuery={{ serviceInstances: [] }}
          item={mockService}
          formElementRef={ref}
          jsonSchemaFormRef={{ current: null }}
          onChange={onChange}
          onError={onError}
          onCompleted={onCompleted}
        />
      </MockedProvider>,
    );

    await componentUpdate(component);
    await componentUpdate(component);

    const instanceNameInput = component.find('input#instanceName');
    instanceNameInput.instance().value = mockService.name;
    expect(instanceNameInput.instance().value).toEqual(mockService.name);

    await componentUpdate(component);
    await componentUpdate(component);

    const form = component.find('form#createInstanceForm');
    form.simulate('submit');

    await componentUpdate(component);
    await componentUpdate(component);
    expect(gqlMock.result).toHaveBeenCalled();

    expect(onCompleted).toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(
      `cmf-instances/details/${mockService.name}`,
    );
  });

  it('Shows error notification if an error occured', async () => {
    const ref = React.createRef();
    const mockService = mockServiceClass(1, true, [mockPlan(1, true)]);

    const gqlMock = createServiceInstanceErrorMock(mockService.name);

    const component = mount(
      <MockedProvider mocks={[gqlMock]} addTypename={false}>
        <CreateInstanceModal
          setCustomValid={jest.fn()}
          checkInstanceExistQuery={{ serviceInstances: [] }}
          item={mockService}
          formElementRef={ref}
          jsonSchemaFormRef={{ current: null }}
          onChange={onChange}
          onError={onError}
          onCompleted={onCompleted}
        />
      </MockedProvider>,
    );

    await componentUpdate(component);
    await componentUpdate(component);

    const instanceNameInput = component.find('input#instanceName');
    instanceNameInput.instance().value = mockService.name;
    expect(instanceNameInput.instance().value).toEqual(mockService.name);

    await componentUpdate(component);
    await componentUpdate(component);
    const form = component.find('form#createInstanceForm');
    form.simulate('submit');

    await componentUpdate(component);

    expect(onCompleted).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('Create instance with empty plan spec', async () => {
    const ref = React.createRef();
    const mockService = mockServiceClass(1, false, [mockPlan(1, false)]);
    const gqlMock = createServiceInstanceNoPlanSpecSuccessfulMock(
      mockService.name,
    );

    const component = mount(
      <MockedProvider mocks={[gqlMock]} addTypename={false}>
        <CreateInstanceModal
          setCustomValid={jest.fn()}
          checkInstanceExistQuery={{ serviceInstances: [] }}
          item={mockService}
          formElementRef={ref}
          jsonSchemaFormRef={{ current: null }}
          onChange={onChange}
          onError={onError}
          onCompleted={onCompleted}
        />
      </MockedProvider>,
    );

    await componentUpdate(component);
    await componentUpdate(component);

    const instanceNameInput = component.find('input#instanceName');
    instanceNameInput.instance().value = mockService.name;
    expect(instanceNameInput.instance().value).toEqual(mockService.name);

    await componentUpdate(component);
    await componentUpdate(component);

    const form = component.find('form#createInstanceForm');
    form.simulate('submit');

    await componentUpdate(component);
    await componentUpdate(component);
    expect(gqlMock.result).toHaveBeenCalled();

    expect(onCompleted).toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(
      `cmf-instances/details/${mockService.name}`,
    );
  });

  describe('Preselected plan', () => {
    let gqlMock;
    const testPlan = {
      name: 'testname',
      displayName: "Look, it's a bird!",
    };
    beforeEach(() => {
      gqlMock = createServiceInstanceErrorMock();
    });

    it('Shows the preselected plan name', () => {
      const mockService = mockServiceClass(1, false, [testPlan]);
      const { queryByText } = render(
        <MockedProvider mocks={[gqlMock]} addTypename={false}>
          <CreateInstanceModal
            setCustomValid={jest.fn()}
            checkInstanceExistQuery={{ serviceInstances: [] }}
            item={mockService}
            formElementRef={{ current: null }}
            jsonSchemaFormRef={{ current: null }}
            onChange={onChange}
            onError={onError}
            onCompleted={onCompleted}
            preselectedPlan={testPlan}
          />
        </MockedProvider>,
      );
      expect(queryByText(testPlan.displayName)).toBeInTheDocument();
    });

    it("Doesn't render the plan selection", () => {
      const mockService = mockServiceClass(1, false, [testPlan]);
      const { queryByLabelText } = render(
        <MockedProvider mocks={[gqlMock]} addTypename={false}>
          <CreateInstanceModal
            setCustomValid={jest.fn()}
            checkInstanceExistQuery={{ serviceInstances: [] }}
            item={mockService}
            formElementRef={{ current: null }}
            jsonSchemaFormRef={{ current: null }}
            onChange={onChange}
            onError={onError}
            onCompleted={onCompleted}
            preselectedPlan={testPlan}
          />
        </MockedProvider>,
      );
      expect(queryByLabelText('plan-selector')).not.toBeInTheDocument();
    });
  });
});

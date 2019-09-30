import React, { useRef, useReducer, useState } from 'react';
import PropTypes from 'prop-types';

import {
  InlineHelp,
  FormFieldset,
  FormInput,
  FormItem,
  FormLabel,
  FormSet,
} from 'fundamental-react';
import './CreateNamespaceForm.scss';
import LabelSelectorInput from '../LabelSelectorInput/LabelSelectorInput';

const LIMIT_REGEX =
  '^[+]?[0-9]*(.[0-9]*)?(([eE][-+]?[0-9]+(.[0-9]*)?)?|([MGTPE]i?)|Ki|k|m)?$';

const NameField = ({ reference }) => (
  <>
    <label className="fd-form__label" htmlFor="runtime-name">
      Name *
      <InlineHelp
        placement="bottom-right"
        text="
            The name must consist of lower case alphanumeric characters or dashes, 
            and must start and end with an alphanumeric character (e.g. 'my-name1').
            "
      />
    </label>
    <input
      className="fd-form__control"
      ref={reference}
      type="text"
      id="runtime-name"
      placeholder="Namespace name"
      aria-required="true"
      required
      pattern="^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$"
    />
  </>
);

const DisableSidecarField = ({ reference }) => (
  <>
    <FormFieldset>
      <FormItem isCheck>
        <input
          className="fd-form__control"
          ref={reference}
          type="checkbox"
          id="disable-istio"
          placeholder="disable side-car"
        />
        <FormLabel htmlFor="disable-istio">
          Disable side-car injection
          <InlineHelp
            placement="bottom-right"
            text="
                Select this option to disable istio to mediate all
                  communication between the pods in your namespace.
                "
          />
        </FormLabel>
      </FormItem>
    </FormFieldset>
  </>
);

const MemoryQuotasCheckbox = ({ checkboxRef, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <FormFieldset>
      <FormItem isCheck>
        <input
          className="fd-form__control"
          ref={checkboxRef}
          type="checkbox"
          id="memory-quotas"
          onChange={e => setIsExpanded(e.target.checked)}
        />
        <FormLabel htmlFor="memory-quotas">
          Apply Total Memory Quotas
          <InlineHelp
            placement="bottom-right"
            text="
                 Define constraints that limit total memory consumption in your
                  namespace. 
                  Use plain value in bytes, or suffix equivalents. For example:
                  128974848, 129e6, 129M, 123Mi.
                "
          />
        </FormLabel>
        {isExpanded && children}
      </FormItem>
    </FormFieldset>
  );
};

const SectionRow = ({
  id,
  description,
  placeholder,
  pattern,
  reference,
  defaultValue,
  type = 'text',
  required = true,
}) => (
  <>
    <FormLabel htmlFor={id}>{description}</FormLabel>
    <FormInput
      id={id}
      placeholder={placeholder}
      type={type}
      defaultValue={defaultValue}
      pattern={pattern}
      ref={reference}
      required={required}
    />
  </>
);

const MemoryQuotasSection = ({ limitsRef, requestsRef }) => (
  <FormSet className="input-fields">
    <SectionRow
      id="memory-limit"
      reference={limitsRef}
      defaultValue="3Gi"
      pattern={LIMIT_REGEX}
      description="Memory limit *"
      placeholder="Memory limit"
    />
    <SectionRow
      id="memory-requests"
      placeholder="Memory requests"
      type="text"
      defaultValue="2.8Gi"
      pattern={LIMIT_REGEX}
      reference={requestsRef}
      description="Memory requests *"
    />
  </FormSet>
);

const ContainerLimitsCheckbox = ({ checkboxRef, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <FormFieldset>
      <FormItem isCheck>
        <input
          className="fd-form__control"
          ref={checkboxRef}
          type="checkbox"
          id="container-limits"
          onChange={e => setIsExpanded(e.target.checked)}
        />
        <FormLabel htmlFor="container-limits">
          Apply limits per container
          <InlineHelp
            placement="bottom-right"
            text="
                  Define memory constraints for individual containers in your
                  namespace. Use plain value in bytes, or suffix
                  equivalents. For example: 128974848, 129e6, 129M, 123Mi.
                "
          />
        </FormLabel>
        {isExpanded && children}
      </FormItem>
    </FormFieldset>
  );
};

const ContainerLimitSection = ({ maxRef, defaultRef, requestRef }) => (
  <FormSet className="input-fields">
    <SectionRow
      id="container-max"
      placeholder="Max"
      type="text"
      defaultValue="1Gi"
      pattern={LIMIT_REGEX}
      ref={maxRef}
      description="Max *"
    />
    <SectionRow
      id="container-default"
      placeholder="Default"
      type="text"
      defaultValue="512Mi"
      pattern={LIMIT_REGEX}
      ref={defaultRef}
      description="Default *"
    />
    <SectionRow
      id="container-default-request"
      placeholder="Default request"
      type="text"
      defaultValue="32Mi"
      pattern={LIMIT_REGEX}
      ref={requestRef}
      description="Default request *"
    />
  </FormSet>
);

const CreateNamespaceForm = ({
  formElementRef,
  onChange,
  onCompleted,
  onError,
}) => {
  const [labels, setLabels] = useState([]);
  const formValues = {
    name: useRef(null),
    enableIstio: useRef(null),
    memoryQuotas: {
      enableMemoryQuotas: useRef(null),
      memoryLimit: useRef(null),
      memoryRequests: useRef(null),
    },
    containerLimits: {
      enableContainerLimits: useRef(null),
      max: useRef(null),
      default: useRef(null),
      defaultRequest: useRef(null),
    },
  };

  function handleLabelsChanged(newLabels) {
    setLabels(newLabels);
  }

  const handleFormSubmit = async e => {
    e.preventDefault();
    const runtimeName = formValues.name.current.value;
    try {
      //   await addRuntime({
      //     name: runtimeName,
      //     description: formValues.description.current.value,
      //   });
      onCompleted(runtimeName, `Runtime created succesfully`);
    } catch (e) {
      onError(`The runtime could not be created succesfully`, e.message || ``);
    }
  };

  return (
    <form onChange={onChange} ref={formElementRef} onSubmit={handleFormSubmit}>
      <div className="fd-form__set">
        <div className="fd-form__item">
          <NameField reference={formValues.name} />
        </div>
        <div className="fd-form__item">
          <label className="fd-form__label">Labels</label>
          <LabelSelectorInput labels={labels} onChange={handleLabelsChanged} />
        </div>
        <div className="fd-form__item">
          <DisableSidecarField reference={formValues.enableIstio} />
        </div>
        <div className="fd-form__item">
          <MemoryQuotasCheckbox
            checkboxRef={formValues.memoryQuotas.enableMemoryQuotas}
          >
            <MemoryQuotasSection
              limitsRef={formValues.memoryQuotas.limitsRef}
              requestsRef={formValues.memoryQuotas.requestsRef}
            />
          </MemoryQuotasCheckbox>

          <ContainerLimitsCheckbox
            checkboxRef={formValues.containerLimits.enableContainerLimits}
          >
            <ContainerLimitSection
              max={formValues.containerLimits.max}
              default={formValues.containerLimits.default}
              defaultRequest={formValues.containerLimits.defaultRequest}
            />
          </ContainerLimitsCheckbox>
        </div>
      </div>
    </form>
  );
};

// CreateNamespaceForm.propTypes = {
//   formElementRef: CustomPropTypes.elementRef, // used to store <form> element reference
//   isValid: PropTypes.bool.isRequired,
//   onChange: PropTypes.func.isRequired,
//   onError: PropTypes.func.isRequired, // args: title(string), message(string)
//   onCompleted: PropTypes.func.isRequired, // args: title(string), message(string)
// };

export default CreateNamespaceForm;

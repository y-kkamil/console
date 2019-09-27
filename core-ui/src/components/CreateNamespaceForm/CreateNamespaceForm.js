import React, { useRef, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { CustomPropTypes } from '@kyma-project/components';
import {
  InlineHelp,
  FormFieldset,
  FormInput,
  FormItem,
  FormLabel,
  FormLegend,
  FormMessage,
  FormRadioGroup,
  FormRadioItem,
  FormSelect,
  FormSet,
  FormTextarea,
} from 'fundamental-react';
import './CreateNamespaceForm.scss';

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

const EnableIstioField = ({ reference }) => (
  <>
    <FormFieldset>
      <FormItem isCheck>
        <input
          className="fd-form__control"
          ref={reference}
          type="checkbox"
          id="enable-istio"
          placeholder="Enable Istio"
        />
        <FormLabel htmlFor="enable-istio">
          Enable Istio
          <InlineHelp
            placement="bottom-right"
            text="
                Select this option to enable istio to mediate all
                  communication between the pods in your namespace.
                "
          />
        </FormLabel>
      </FormItem>
    </FormFieldset>
  </>
);

const MemoryQuotasSection = ({}) => <span>section</span>;

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
          data-target="#ukryta-tresc"
          aria-expanded="false"
          aria-controls="ukryta-tresc"
          data-toggle="collapse"
          onChange={e => setIsExpanded(e.target.checked)}
        />
        <FormLabel htmlFor="memory-quotas">
          Apply Total Memory Quotas
          <InlineHelp
            placement="bottom-right"
            text="
                 Define constraints that limit total memory consumption in your
                  namespace. <br />
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

const CreateNamespaceForm = ({
  formElementRef,
  onChange,
  onCompleted,
  onError,
}) => {
  const formValues = {
    name: useRef(null),
    enableIstio: useRef(null),
    enableMemoryQuotas: useRef(null),
  };

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
    <form
      onChange={onChange}
      ref={formElementRef}
      // style={{ width: '30em' }}
      onSubmit={handleFormSubmit}
    >
      <div className="fd-form__set">
        <div className="fd-form__item">
          <NameField reference={formValues.name} />
        </div>
        <div className="fd-form__item">
          <EnableIstioField reference={formValues.enableIstio} />
        </div>
        <div className="fd-form__item">
          <MemoryQuotasCheckbox checkboxRef={formValues.enableMemoryQuotas}>
            <MemoryQuotasSection />
          </MemoryQuotasCheckbox>
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

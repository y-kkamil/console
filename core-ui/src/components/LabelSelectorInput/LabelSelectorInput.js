import React from 'react';
import './LabelSelectorInput.scss';
import { Token } from 'fundamental-react/Token';
import {
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
} from 'fundamental-react/Forms';

//TODO: move this component to a shared "place"

const RemovableLabel = ({ text }) => (
  <Token className="label" onClick={function C() {}}>
    {text}
  </Token>
);

const LabelSelectorInput = ({
  labels = ['aaaa=bbbbb', 'istio-injection=enabled'],
  readonlyLabels = [],
  onchange,
}) =>
  labels.length ? (
    <div className="fd-form__set">
      <div className="wrapper">
        {labels.map(l => (
          <RemovableLabel text={l} />
        ))}
        <input
          className="fd-form__control"
          type="text"
          id="input-1"
          placeholder="Field placeholder text"
        />
      </div>
    </div>
  ) : null;

export default LabelSelectorInput;

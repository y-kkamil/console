import React from 'react';
import './LabelSelectorInput.scss';
import { Token } from 'fundamental-react/Token';

//TODO: move this component to a shared "place"

const labelRegexp = /[a-z0-9A-Z-_.]+=[a-z0-9A-Z-_.]+/;

const RemovableLabel = ({ text, onClick }) => (
  <Token title="Click to remove" className="label" onClick={onClick}>
    {text}
  </Token>
);

const LabelSelectorInput = ({ labels = [], readonlyLabels = [], onChange }) => {
  function handleLabelEntered(e) {
    const value = e.target.value;
    if (e.keyCode !== 13 || !labelRegexp.test(value)) return;
    e.target.value = '';
    onChange([...labels, value]);
  }
  function handleLabelRemoved(label) {
    onChange(labels.filter(l => l !== label));
  }

  return (
    <div className="fd-form__set">
      <div className="wrapper">
        {labels.map(l => (
          <RemovableLabel
            key={l}
            text={l}
            onClick={() => handleLabelRemoved(l)}
          />
        ))}
        <input
          className="fd-form__control"
          type="text"
          id="input-1"
          placeholder="Enter new label"
          onKeyDown={handleLabelEntered}
        />
      </div>
    </div>
  );
};

export default LabelSelectorInput;

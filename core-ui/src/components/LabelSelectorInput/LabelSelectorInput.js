import React from 'react';
import './LabelSelectorInput.scss';
import { Token } from 'fundamental-react/Token';

//TODO: move this component to a shared "place"

const RemovableLabel = ({ text }) => (
  <Token onClick={function C() {}}>{text}</Token>
);

const LabelSelectorInput = ({
  labels = ['aaaa=bbbbb', 'istio-injection=enabled'],
  readonlyLabels = [],
  onchange,
}) => (labels.length ? labels.map(l => <RemovableLabel text={l} />) : null);

export default LabelSelectorInput;

import React from 'react';

import {
  Button,
  Dropdown,
  FormFieldset,
  FormInput,
} from '@kyma-project/react-components';

import {
  FiltersDropdownWrapper,
  FormLabel,
  FormItem,
  Panel,
  PanelBody,
} from './styled';

const FilterDropdown = ({ filter, onChange, availableLabels }) => {
  const disabled = Object.entries(availableLabels).length === 0;
  const control = (
    <Button option="emphasized" disabled={disabled} data-e2e-id="toggle-filter">
      Filter
    </Button>
  );

  return !filter ? null : (
    <FiltersDropdownWrapper>
      <Dropdown control={control} disabled={disabled}>
        <Panel>
          <PanelBody>
            <FormFieldset>
              {Object.entries(availableLabels).map(
                ({ 0: label, 1: count }, index) => {
                  return (
                    <FormItem isCheck key={index}>
                      <FormInput
                        data-e2e-id={`filter-${label}`}
                        type="checkbox"
                        id={`checkbox-${index}`}
                        name={`checkbox-name-${index}`}
                        onClick={() => onChange()}
                      />
                      <FormLabel htmlFor={`checkbox-${index}`}>
                        {label} - ({count})
                      </FormLabel>
                    </FormItem>
                  );
                },
              )}
            </FormFieldset>
          </PanelBody>
        </Panel>
      </Dropdown>
    </FiltersDropdownWrapper>
  );
};

export default FilterDropdown;

import Autocomplete, { AutocompleteChangeReason, AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, { useCallback } from 'react';

export interface CustomSelectValue { id: string, name: string }

export interface CustomSelectProps {
  value: CustomSelectValue | CustomSelectValue[];
  onChange: (value: CustomSelectValue | CustomSelectValue[] | null) => void;
  options: CustomSelectValue[];
  multiple?: boolean;
  placeholder?: string;
  error: string[];
  onInputValueChange: (value: string) => void;
}

export const CustomSelect = ({ value, onChange, options, multiple, placeholder, error, onInputValueChange }: CustomSelectProps) => {
  const [inputValue, setInputValue] = React.useState('');

  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams) => <TextField {...params} variant="standard" placeholder={placeholder} />,
    [placeholder]
  );
  const autoCompleteOnChange = useCallback(
    (event: React.SyntheticEvent, value: CustomSelectValue | CustomSelectValue[] | null, reason: AutocompleteChangeReason) => {
      onChange(value);
    }, [onChange]);

  const onInputChange = useCallback(
    (event: React.SyntheticEvent, newInputValue: string) => {
      onInputValueChange(newInputValue);
      setInputValue(newInputValue);
    }, [onInputValueChange]
  )
  return (<>
    <Autocomplete
      multiple={multiple}
      value={value}
      onChange={autoCompleteOnChange}
      options={options}
      filterOptions={(x) => x}
      renderInput={renderInput}
      getOptionLabel={option => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      inputValue={inputValue}
      onInputChange={onInputChange}
    />
    {error.length ? <div role="alert" className="ant-form-item-explain-error">{error.join(', ')}</div> : null}
  </>
  )
}
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { set } from 'd3';

export default function AutoCompleteField(props) {
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = React.useState(null);

  let onInputChange = (evt, newInput) => {
    setInputValue(newInput);
  };

  let onChange = (evt, newValue) => {
    // console.log(newValue);
    props.onChange(newValue);
    setValue(newValue);
  };

  return (
    <Autocomplete
      id="combo-box-demo"
      value={value}
      onChange={onChange}
      onInputChange={onInputChange}
      inputValue={inputValue}
      options={props.options.sort(
        (a, b) => -b.company.localeCompare(a.company)
      )}
      getOptionLabel={option => option.email}
      groupBy={option => props.getCompanyName(option.company)}
      renderOption={option => (
        <React.Fragment>
          <span style={{ fontWeight: 'bold' }}>{option.email}</span>
          --{props.getCompanyName(option.company)}
        </React.Fragment>
      )}
      renderInput={params => (
        <TextField
          {...params}
          label="Choose a user"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password' // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

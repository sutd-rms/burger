import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

function concat(userObj) {
  return (
    userObj.name +
    ' ' +
    userObj.surname +
    ': ' +
    userObj.email +
    '     (' +
    userObj.number +
    ')'
  );
}

export default function AutoCompleteField(props) {
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  return (
    <Autocomplete
      id="combo-box-demo"
      onChange={(event, newValue) => {
        props.onChange(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={props.options}
      getOptionLabel={option => option.email}
      renderOption={option => (
        <React.Fragment>
          <span>{option.name + ' ' + option.surname}</span>
          {option.email} ({option.number}) --{option.organization}
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

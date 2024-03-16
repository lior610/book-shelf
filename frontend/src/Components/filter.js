import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Filter(props) {
  const { label, value, onChange, options, noneLabel, disabledLabel } = props;

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id={`demo-select-${label}-label`}>{label}</InputLabel>
      <Select
        labelId={`demo-select-${label}-label`}
        id={`demo-select-${label}`}
        value={value}
        label={label}
        onChange={onChange}
      >
        <MenuItem value="">
          <em>{noneLabel}</em>
        </MenuItem>
        {options ? options.map((option) => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        )) : (
          <MenuItem disabled>{disabledLabel}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
}

export default Filter;

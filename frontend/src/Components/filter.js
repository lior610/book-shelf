import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function LanguageFilter() {
  const [language, setLanguage] = React.useState('');

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Language</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={language}
        label="Language"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>hebrew</MenuItem>
        <MenuItem value={20}>english</MenuItem>
        <MenuItem value={30}>spani</MenuItem>
      </Select>
    </FormControl>
  );
}

function GenreFilter() {
    const [genre, setGenre] = React.useState('');
  
    const handleChange = (event) => {
      setGenre(event.target.value);
    };
  
    return (
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Genre</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={genre}
          label="Genre"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Teens</MenuItem>
          <MenuItem value={20}>Dystopian</MenuItem>
          <MenuItem value={30}>Drama</MenuItem>
        </Select>
      </FormControl>
    );
  }

export { LanguageFilter, GenreFilter };
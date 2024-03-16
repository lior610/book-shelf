import React from "react";
import Filter from './filter';

function LanguageFilter(props) {
  const [language, setLanguage] = React.useState('');

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <Filter
      label="Language"
      value={language}
      onChange={handleChange}
      options={props.languages}
      noneLabel="None"
      disabledLabel="No languages available"
    />
  );
}

function GenreFilter(props) {
  const [genre, setGenre] = React.useState('');

  const handleChange = (event) => {
    setGenre(event.target.value);
  };

  return (
    <Filter
      label="Genre"
      value={genre}
      onChange={handleChange}
      options={props.genres}
      noneLabel="None"
      disabledLabel="No genres available"
    />
  );
}

export { LanguageFilter, GenreFilter };

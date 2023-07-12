import React, { useState, useEffect } from 'react';
import { getBookValues } from '../bookUtils';
import { type } from '@testing-library/user-event/dist/type';


function Autosuggest({ suggestions, handleElements, placeholder }) {

  const [value, setValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [rows, setRows] = useState(1);

  function handleChange(event) {
    let elements = event.target.value.split('\n');

    if (elements.length > rows && elements[elements.length - 2] !== '' && filteredSuggestions.length > 0) {
      elements[elements.length - 2] = filteredSuggestions[0];
    }
    if (elements.length != rows) {
      setRows(elements.length)
    }

    setValue(elements.join('\n'))
    handleElements(elements.filter(element => element !== ''));

    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().startsWith(elements[elements.length - 1].toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  function handleSuggestionClick(suggestion) {
    setValue(suggestion);
    setFilteredSuggestions([]);
  };


  return (
    <div className="mx-auto" style={{ position: "relative", width: "90%" }}>
      <textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        style={{ resize: 'none', width: "100%" }}
      />
      {(filteredSuggestions.length > 0 && value !== '' && value[value.length-1] !== '\n') && (
        <ul className='suggestions-popup'>
          {filteredSuggestions.map((suggestion, index) => (
            <li className='suggestion-item' key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Autosuggest;
import React, { useState, useEffect } from 'react';


function AutoSuggest({ elements, handleElements, suggestions, placeholder }) {

  const [hasEmptyRow, setHasEmptyRow] = useState(elements.length === 0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  function handleChange(event) {
    console.log('handleChange');
    const values = event.target.value.split('\n');

    if (elements.length > 0 && values.length > elements.length && filteredSuggestions.length > 0) {
      values[values.length - 2] = filteredSuggestions[0];
    }
    
    setHasEmptyRow(values[values.length - 1] === '');

    if (values[values.length - 1] !== '') {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(values[values.length - 1].toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }

    handleElements(values.filter((value) => value !== ''));
  };

  function handleSuggestionClick(suggestion) {
    const values = [...elements];
    values[values.length - 1] = suggestion;
    setHasEmptyRow(true);
    setFilteredSuggestions([]);
    handleElements(values.filter((value) => value !== ''))
  };

  return (
    <div className="mx-auto" style={{ position: "relative", width: "90%" }}>
      <textarea
        value={elements.join('\n') + ((hasEmptyRow && elements.length > 0) ? '\n' : '')}
        onChange={handleChange}
        placeholder={placeholder}
        rows={elements.length + ((hasEmptyRow) ? 1 : 0)}
        style={{ resize: 'none', width: "100%" }}
      />
      {(filteredSuggestions.length > 0 && elements.length !== 0 && elements[elements.length - 1] !== '') && (
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

export default AutoSuggest;

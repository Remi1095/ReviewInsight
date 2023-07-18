import React, { useState, useEffect } from 'react';


function Autosuggest({ elements, handleElements, suggestions, placeholder }) {

  const [hasEmptyRow, setHasEmptyRow] = useState(elements.length === 0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  function handleChange(event) {
    console.log('handleChange');
    const values = event.target.value.split('\n');

    if (elements.length > 0 && values.length > elements.length && filteredSuggestions.length > 0) {
      values[values.length - 2] = filteredSuggestions[0];
    }
    console.log(values);
    console.log(elements);
    setHasEmptyRow(values[values.length - 1] === '');

    if (values[values.length - 1] !== '') {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(values[values.length - 1].toLowerCase())
      );
      console.log(filtered);
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

  const handleKeyEnter = (event) => {
    if (event.key === "Enter") {
      //event.preventDefault(); // Prevent the default Enter key behavior

      // Your custom code here
      console.log("Enter key was pressed!");
      // Perform any additional actions or manipulate the textarea content as needed
    }
  };


  return (
    <div className="mx-auto" style={{ position: "relative", width: "90%" }}>
      <textarea
        value={elements.join('\n') + ((hasEmptyRow && elements.length > 0) ? '\n' : '')}
        onChange={handleChange}
        onKeyDown={handleKeyEnter}
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

export default Autosuggest;

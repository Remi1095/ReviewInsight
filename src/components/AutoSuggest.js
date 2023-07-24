import React, { useState, useEffect, useRef } from 'react';


function AutoSuggest({ elements, handleElements, suggestions, placeholder, maxLines = suggestions.length }) {

  const [hasEmptyRow, setHasEmptyRow] = useState(elements.length === 0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const textareaRef = useRef(null);

  useEffect(() => {
    // Add event listener to document for click events
    document.addEventListener('click', handleClickOutside);

    return () => {
      // Clean up by removing the event listener when component unmounts
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    // Check if the click occurred outside the textarea and suggestions popup
    if (textareaRef.current && !textareaRef.current.contains(event.target)) {
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true);
    }
  };

  function handleChange(event) {
    const values = event.target.value.split('\n');

    setHasEmptyRow(values[values.length - 1] === '' && values.length <= maxLines);

    if (values.length > 0 && values[values.length - 1] !== '') {
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
    if (values.length > 0) {
      values[values.length - 1] = suggestion;
    } else {
      values.push(suggestion);
    }
    setFilteredSuggestions([]);
    handleElements(values.filter((value) => value !== ''))
  };

  function handleKeyTab(event) {
    if (event.key === 'Enter' && filteredSuggestions.length > 0) {
      event.preventDefault();
      const values = event.target.value.split('\n');
      if (values.length > 0) {
        values[values.length - 1] = filteredSuggestions[0];
      } else {
        values.push(filteredSuggestions[0]);
      }
      setFilteredSuggestions([]);
      handleElements(values.filter((value) => value !== ''));

    }
  }


  return (
    <div style={{ position: "relative" }}>
      <textarea
        ref={textareaRef}
        value={elements.join('\n') + ((hasEmptyRow && elements.length > 0) ? '\n' : '')}
        onChange={handleChange}
        onKeyDown={handleKeyTab}
        placeholder={placeholder}
        rows={elements.length + ((hasEmptyRow) ? 1 : 0)}
        style={{ resize: 'none', width: "100%" }}
      />
      {(filteredSuggestions.length > 0 && showSuggestions) && (
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

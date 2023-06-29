import React, { useState } from 'react';

function RatingSlider() {
  const [value, setValue] = useState(5);

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    setValue(newValue);
  };

  const markings = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <div>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={handleChange}
        className="rating-slider"
      />
      <div className="d-flex justify-content-between">
        {markings.map((number) => (
          <span className={`text-center ${number === value ? "highlight" : ""}`} style={{flex:"1"}} key={number}>{number}</span>
        ))}
      </div>
    </div>
  );
};

export default RatingSlider;
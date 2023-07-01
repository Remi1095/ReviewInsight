import React, { useState, useRef, useLayoutEffect } from 'react';

function RatingSlider() {
  const [value, setValue] = useState(5);
  const parentRef = useRef(null);
  const [width, setWidth] = useState(100)

  useLayoutEffect(() => {
    function handleResize() {
      if (parentRef.current) {
        const parentWidth = parentRef.current.offsetWidth;
        setWidth(parentWidth)
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [parentRef]);

  function handleChange(event) {
    const newValue= parseInt(event.target.value);
    setValue(newValue);
  };

  const markings = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <div className='mx-auto' style={{ width: '100%' }} ref={parentRef}>
      <style>
        {`
          input[type="range"]::-webkit-progress-value,
          input[type="range"]::-moz-range-progress {
            background-color: var(--accent-0);
            height: ${width / 40}px;
            border-radius: ${width / 40}px;
          }

          input[type="range"]::-webkit-slider-runnable-track,
          input[type="range"]::-moz-range-track {
            background-color: lightgray;
            height: ${width / 40}px;
            border-radius: ${width / 40}px;
          }

          input[type="range"]::-webkit-slider-thumb,
          input[type="range"]::-moz-range-thumb {
            background-color: var(--accent-0);
            border: ${width / (160 / 3)}px solid var(--accent-1);
            width: ${width / 16}px;
            height: ${width / 16}px;
            border-radius: 50%;
            cursor: pointer;
          }
        `}
      </style>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={handleChange}
        style={{ width: "100%", height: `${width / 16 + width / (80 / 3)}px`, backgroundColor: "transparent"}}
      />
      <div className="d-flex">
        {markings.map((number) => (
          <span className={`text-center ${number === value ? "highlight" : ""}`} style={{ flex: "1", width: `${width}px`, fontSize: `${width/20}px` }} key={number}>{number}</span>
        ))}
      </div>

    </div>
  );
};

export default RatingSlider;
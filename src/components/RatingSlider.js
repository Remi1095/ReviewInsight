import React, { useState, useRef, useLayoutEffect } from 'react';

function RatingSlider({rating, handleRating}) {
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
    const newRating = parseInt(event.target.value);
    handleRating(newRating)
  };

  function handleNumberClick(rating) {
    handleRating(rating)
  }

  const markings = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <div className='mx-auto' style={{ width: '100%' }} ref={parentRef}>
      <style>
        {`
          input[type=range] {
            height: ${width * (34 / 320)}px;
            -webkit-appearance: none;
            margin: 0;
            width: 100%;
          }
          input[type=range]:focus {
            outline: none;
          }
          input[type=range]::-webkit-slider-runnable-track {
            width: 100%;
            height: ${width * (8 / 320)}px;
            cursor: pointer;
            animate: 0.2s;
            background: lightgray;
            border-radius: ${width * (8 / 320)}px;
            border: 1px black solid;
          }
          input[type=range]::-webkit-slider-thumb {
            border: ${width * (6 / 320)}px solid var(--accent-1);
            height: ${width * (32 / 320)}px;
            width: ${width * (32 / 320)}px;
            border-radius: 50%;
            background: var(--accent-0);
            cursor: pointer;
            -webkit-appearance: none;
            margin-top: -${width * (12 / 320)}px;
          }
          input[type=range]:focus::-webkit-slider-runnable-track {
            background: lightgray;
          }
          input[type=range]::-moz-range-progress {
            width: 100%;
            height: ${width * (8 / 320)}px;
            cursor: pointer;
            animate: 0.2s;
            background: var(--accent-0);
            border-radius: ${width * (8 / 320)}px;
          }
          input[type=range]::-moz-range-track {
            width: 100%;
            height: ${width * (8 / 320)}px;
            cursor: pointer;
            animate: 0.2s;
            background: lightgray;
            border-radius: ${width * (8 / 320)}px;
            border: 1px black solid;
          }
          input[type=range]::-moz-range-thumb {
            border: ${width * (6 / 320)}px solid var(--accent-1);
            height: ${width * (20 / 320)}px;
            width: ${width * (20 / 320)}px;
            border-radius: 50%;
            background: var(--accent-0);
            cursor: pointer;
          }
        `}
      </style>
      <input
        type="range"
        min="1"
        max="10"
        value={rating}
        onChange={handleChange}
        style={{ width: "100%", height: `${width / 16 + width / (80 / 3)}px`, backgroundColor: "transparent" }}
      />
      <div className="d-flex">
        {markings.map((number) => (
          <span
            className={`text-center pointer ${number === rating ? "highlight" : ""}`}
            style={{ flex: "1", width: `${width}px`, fontSize: `${width / 20}px` }}
            key={number}
            onClick={() => handleNumberClick(number)}
          >
            {number}
          </span>
        ))}
      </div>

    </div>
  );
};

export default RatingSlider;
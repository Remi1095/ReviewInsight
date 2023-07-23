import React, { useRef, useState, useEffect } from "react";

function ShowMore({ text, lines, showMore, handleShowMore }) {
  const textRef = useRef(null);
  const [overflowing, setOverflowing] = useState(false);
  const [height, setHeight] = useState("");

  useEffect(() => {
    const textElement = textRef.current;
    if (textElement) {
      const heightpx = parseFloat(window.getComputedStyle(textElement).lineHeight) * lines
      setHeight(heightpx + "px");
      setOverflowing(textElement.scrollHeight > heightpx);
    }
  }, [textRef, lines]);

  const textArray = text.split('\n');

  return (
    <>
      <p className="my-0" ref={textRef} style={{ maxHeight: showMore ? "none" : height, overflow: "hidden" }}>
        {textArray.map((line, index) => (
          <span  key={index}>
            {line}
            {index !== textArray.length - 1 && <br />}
          </span>
        ))}
      </p>
      {overflowing && (
        <strong className="pointer" onClick={handleShowMore} style={{ fontSize: "smaller" }}>
          <u>{showMore ? "Show Less" : "Show More"}</u>
        </strong>
      )}
    </>
  );
}

export default ShowMore;

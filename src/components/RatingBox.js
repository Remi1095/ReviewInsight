import React from "react";

function RatingBox({ score, textTag, style={} }) {

  const TextTag = `${textTag}`

  return (
    <div className="rating-box mx-auto" style={style}>
      <div className="rating-fill" style={{ height: `${score * 10}%` }}></div>
      <TextTag className="rating-text">{score}</TextTag>
    </div>
  );
}

export default RatingBox;
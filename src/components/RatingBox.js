import React from "react";

function RatingBox({ rating, textTag, style={} }) {

  const TextTag = `${textTag}`

  return (
    <div className="rating-box mx-auto" style={style}>
      {rating && (
      <div
       className="rating-fill" 
       style={{ 
        height: `${rating * 10}%`, 
        borderTop: (!rating || rating === 0 || rating === 10) ? 'none' : 'inherit'}}></div>
      )}
      <TextTag className="rating-text">{rating}</TextTag>
    </div>
  );
}

export default RatingBox;
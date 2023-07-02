import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDragon } from "@fortawesome/free-solid-svg-icons";

function BookCover({ color, iconColor, icon, style }) {
  const coverStyle = {
    backgroundColor: color,
    width: "100%", // Set the width to 100%
    paddingBottom: "150%", // Set the padding-bottom to maintain the 2:3 aspect ratio
    position: "relative", // Add relative positioning
    ...style, // Merge additional style with coverStyle
  };

  const iconStyle = {
    position: "absolute", // Position the icon absolutely within the cover
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)", // Center the icon using translate
  };

  return (
    <div style={coverStyle}>
      <FontAwesomeIcon icon={icon} size="5x" color={iconColor} style={iconStyle} />
    </div>
  );
}

export default BookCover;

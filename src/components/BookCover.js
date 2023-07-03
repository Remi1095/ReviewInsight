import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faRocket, faDragon, faPuzzlePiece, faHeart, faPersonRunning, faSkull, faMasksTheater, faXmarksLines,
  faBookOpenReader, faLandmark, faFlask, faSackDollar, faBrain, faInfinity, faHandshakeSimple, faPalette
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faRocket, faDragon, faPuzzlePiece, faHeart, faPersonRunning, faSkull, faMasksTheater, faXmarksLines,
  faBookOpenReader, faLandmark, faFlask, faSackDollar, faBrain, faInfinity, faHandshakeSimple, faPalette
);

function BookCover({ bgColor, iconColor, icon, style="" }) {
  const coverStyle = {
    filter: "grayscale(0.5)",
    backgroundColor: `${bgColor}`,
    width: "100%",
    paddingBottom: "150%",
    position: "relative",
    border: "1px solid black",
    ...style
  };

  const iconStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "50%",
    height: "50%",
    transform: "translate(-50%, -50%)"
  };

  return (
    <div style={coverStyle}>
      <FontAwesomeIcon icon={icon} color={iconColor} style={iconStyle} />
    </div>
  );
}

export default BookCover;

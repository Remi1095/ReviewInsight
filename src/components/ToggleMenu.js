import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";

function ToggleMenu({ menuName, content }) {
    const [isExpanded, setExpanded] = useState(false);

    function toggleMenu() {
        setExpanded(!isExpanded);
    }

    return (
        <div>
            {isExpanded ? (
                <div>
                    <h4 onClick={toggleMenu}>
                        <span className="me-2"><FontAwesomeIcon icon={faCaretDown} /></span>
                        <span>{menuName}</span>
                        <hr />
                    </h4>
                    {content}
                </div>
            ) : (
                <h4 onClick={toggleMenu}>
                    <span className="me-2"><FontAwesomeIcon icon={faCaretRight} /></span>
                    <span>{menuName}</span>
                    <hr />
                </h4>
            )}
        </div>
    );
};

export default ToggleMenu;

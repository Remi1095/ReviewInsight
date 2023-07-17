import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';

function AppDropdown({ items, selectedItem, handleItemSelect, emptyValue, index = null, hasReset = true, className = "" }) {

  function handleItemClick(item) {
    handleItemSelect(item, index);
  };

  return (
    <Dropdown className={className}>
      <Dropdown.Toggle>
        {selectedItem !== "" ? selectedItem : emptyValue}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {items.map((item) => (
          <Dropdown.Item key={item} onClick={() => handleItemClick(item)}>
            {item}
          </Dropdown.Item>
        ))}
        {hasReset && (
          <Dropdown.Item
            className="light-bold"
            style={{ color: "var(--primary-0)" }}
            key={""}
            onClick={() => handleItemClick("")}
          >
            Reset
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default AppDropdown;
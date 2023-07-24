import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from "react-i18next";

function AppDropdown({ items, selectedItem, handleItemSelect, emptyValue, hasReset = true, className = "" }) {
  const { t } = useTranslation();

  console.log(items);

  function handleItemClick(item) {
    handleItemSelect(item);
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
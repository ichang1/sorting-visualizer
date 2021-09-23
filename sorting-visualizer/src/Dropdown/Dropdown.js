import React, { useState } from "react";
import "./Dropdown.css";

export default function Dropdown({ icon, children, right }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={"dropdown" + (right ? " dropdown-right" : " dropdown-left")}
    >
      <div
        className="icon-button"
        onClick={() => {
          setIsOpen((isOpen) => !isOpen);
        }}
      >
        {icon}
      </div>
      {isOpen && <div className="dropdown-menu">{children}</div>}
    </div>
  );
}

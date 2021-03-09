import React, { useState, memo } from "react";

function FilterButton(props) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.isPressed}
      onClick={() => props.setNowTab(props.label)}
    >
      {props.name}
    </button>
  );
}

export default memo(FilterButton);

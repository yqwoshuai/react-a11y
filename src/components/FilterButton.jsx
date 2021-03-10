import React, { useState, memo } from "react";

function FilterButton(props) {
  // aria-pressed 表示按钮是一个切换类型的按钮，告诉屏幕阅读器当前按钮的切换状态
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

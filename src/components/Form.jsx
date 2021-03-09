import React, { useState } from "react";

function Form(props) {
  const [name, setName] = useState("");

  // 提交表单，利用了submit事件，所以按回车也能提交
  const submitTodoItem = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }
    setName("");
    props.addTask(name)
  };

  // 改变输入内容
  const inputValueChange = (e) => {
    setName(e.target.value);
  };

  return (
    <form onSubmit={submitTodoItem}>
      <h2 className="label-wrapper">
        <label className="label__lg" htmlFor="new-todo-input">
          请输入代办事项内容
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={inputValueChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        添加
      </button>
    </form>
  );
}

export default Form;

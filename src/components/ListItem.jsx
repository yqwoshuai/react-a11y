import React, { useEffect, useRef, useState } from "react";
import { usePrevious } from "./hooks";

function ListItem(props) {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  const editInputRef = useRef(null);
  const editButtonRef = useRef(null);

  const { name, id, completed = false } = props.item;

  const editSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim()) {
      return;
    }
    props.editTask(id, newName);
    setNewName("");
    setEditing(false);
  };

  const newNameChange = (e) => {
    setNewName(e.target.value);
  };

  const editTemp = (
    <form className="stack-small" onSubmit={editSubmit}>
      <div className="from-group">
        {/* label与input成对出现 */}
        <label className="todo-label" htmlFor={id}>
          请输入{name}的新名称
        </label>
        <input
          id={id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={newNameChange}
          ref={editInputRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => {
            setEditing(false);
          }}
        >
          {/* 在视觉上隐藏的文案，能被屏幕阅读器读取，更加友好 */}
          取消<span className="visually-hidden">{name} 任务的重命名</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          保存<span className="visually-hidden">{name} 任务的新名称</span>
        </button>
      </div>
    </form>
  );

  const viewTemp = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={id}
          type="checkbox"
          defaultChecked={completed}
          onChange={() => props.toggleTaskCompleted(id)}
        />
        <label className="todo-label" htmlFor={id}>
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          编辑 <span className="visually-hidden">{name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(id)}
        >
          删除 <span className="visually-hidden">{name}</span>
        </button>
      </div>
    </div>
  );

  // 通过获取之前的编辑状态，达到对focus更精细的控制
  const wasEditing = usePrevious(editing);

  useEffect(() => {
    // 从未编辑状态 切换到 编辑状态 时，让编辑框获得焦点
    if (!wasEditing && editing) {
      editInputRef.current.focus();
    }
    // 从编辑状态 切换到 未编辑状态 时，让编辑按钮获得焦点
    if (wasEditing && !editing) {
      editButtonRef.current.focus();
    }
  }, [editing, wasEditing]);

  if (
    props.nowTab === 0 ||
    (!completed && props.nowTab === 1) ||
    (completed && props.nowTab === 2)
  ) {
    return <li className="todo">{editing ? editTemp : viewTemp}</li>;
  } else {
    return null;
  }
}

export default ListItem;

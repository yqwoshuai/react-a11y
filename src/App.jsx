import React, { useEffect, useState, useRef } from "react";
import Filter from "./components/FilterButton";
import ListItem from "./components/ListItem";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

const TABNAME_MAP = [
  {
    name: "全部任务",
    label: 0,
  },
  {
    name: "进行中",
    label: 1,
  },
  {
    name: "已完成",
    label: 2,
  },
];

function App(props) {
  const [taskList, setTaskList] = useState(props.taskList);
  const [nowTab, setNowTab] = useState(0); // 0全部 1进行中 2已完成

  const listHeadingRef = useRef(null);

  const changeTaskList = (newTaskList) => {
    window.localStorage.setItem(
      "reactA11yTaskList",
      JSON.stringify(newTaskList)
    );
    setTaskList(newTaskList);
  };

  const addTask = (name) => {
    const newTask = { id: Date.now(), name, completed: false };
    const newTaskList = [...taskList, newTask];
    changeTaskList(newTaskList);
  };

  const toggleTaskCompleted = (id) => {
    const newTaskList = taskList.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    changeTaskList(newTaskList);
  };

  const deleteTask = (id) => {
    const newTaskList = taskList.filter((item) => item.id !== id);
    changeTaskList(newTaskList);
    // 删除任务时，让焦点回到主标题，可以知道还剩多少任务
    listHeadingRef.current.focus();
  };

  const editTask = (id, newName) => {
    const newTaskList = taskList.map((item) => {
      if (item.id === id) {
        return { ...item, name: newName };
      }
      return item;
    });
    changeTaskList(newTaskList);
  };

  // 切换按钮实现键盘左右切换选中
  const btnFocus = () => {
    window.addEventListener("keydown", btnDownHandler, false);
  };
  const btnBlur = () => {
    window.removeEventListener("keydown", btnDownHandler);
  };
  const btnDownHandler = (e) => {
    if (e.keyCode === 37 && e.target.previousElementSibling) {
      e.target.previousElementSibling.focus();
    }
    if (e.keyCode === 39 && e.target.nextElementSibling) {
      e.target.nextElementSibling.focus();
    }
  };

  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask}></Form>
      <div
        className="filters btn-group stack-exception"
        tabIndex="-1"
        onFocus={btnFocus}
        onBlur={btnBlur}
      >
        {TABNAME_MAP.map((item, index) => {
          return (
            <FilterButton
              key={index}
              name={item.name}
              label={item.label}
              isPressed={index === nowTab}
              setNowTab={setNowTab}
            ></FilterButton>
          );
        })}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        剩余{taskList.filter((item) => !item.completed).length}条任务未完成
      </h2>
      {/* role指定ul的身份为一个list */}
      {/* aria-labelledby在ul标签获得焦点时，屏幕阅读器会把对应id元素的内容读出来 */}
      {/* 如果一个元素同时有aria-labelledby和aria-label，读屏软件会优先读出aria-labelledby的内容 */}
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
        tabIndex="-1"
      >
        {taskList.map((item) => {
          return (
            <ListItem
              key={item.id}
              item={item}
              nowTab={nowTab}
              editTask={editTask}
              deleteTask={deleteTask}
              toggleTaskCompleted={toggleTaskCompleted}
            ></ListItem>
          );
        })}
      </ul>
    </div>
  );
}

export default App;

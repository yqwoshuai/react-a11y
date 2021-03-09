import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

let taskList = [];
if (window.localStorage.getItem("reactA11yTaskList")) {
  taskList = JSON.parse(window.localStorage.getItem("reactA11yTaskList"));
}

ReactDOM.render(
  <React.StrictMode>
    <App taskList={taskList} />
  </React.StrictMode>,
  document.getElementById("root")
);

import { useState } from "react";
import "./addNewTaskModak.css";

export default function AddNewTask({
  arrOfTags,
  setArrOfTags,
  todoList,
  setTodoList,
  setShowModal,
  TodoItem,
}) {
  const [newTask, setNewTask] = useState("");

  function handleAddNewTask(e, value) {
    e.preventDefault();
    let tag = "";
    let st = null;
    let en = null;

    if (value.includes("#")) {
      const start = value.indexOf("#");
      st = start;
      const subStr = value.slice(start);

      if (subStr.includes(" ")) {
        tag = subStr.slice(0, subStr.indexOf(" "));
      } else {
        tag = subStr.slice(0);
      }
      en = st + tag.length;
      if (!arrOfTags.includes(tag)) {
        setArrOfTags([...arrOfTags, tag]);
      }
    }

    const formatedValue = value.slice(0, st) + value.slice(en);
    const task = new TodoItem(new Date().getTime(), formatedValue, tag, false);

    st = null;
    en = null;
    setNewTask("");
    setTodoList([...todoList, task]);
    setShowModal(false);
  }

  return (
    <div
      style={{ top: `${window.pageYOffset}px` }}
      className="modalBackground"
      onClick={() => setShowModal(false)}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={(e) => handleAddNewTask(e, newTask)}>
          <p>
            You can type <u>#hashtag</u> among text
          </p>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New task"
          ></input>
        </form>
      </div>
    </div>
  );
}

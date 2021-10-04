import "./List.css";
import deleteIcon from "./img/delete_black_24dp.svg";
import { Checkbox } from "@material-ui/core";
import { useState } from "react";

export default function List({
  arrOfTags,
  setArrOfTags,
  TodoItem,
  todoList,
  setTodoList,
  sortedList,
}) {
  const [editedTask, setEditedTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  function handleChangeDone(id) {
    setTodoList(
      todoList.map((item) => {
        if (item.id === id) {
          item.done = !item.done;
          return item;
        } else {
          return item;
        }
      })
    );
  }

  function handleAddNewTask(e, value, id) {
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
    setEditedTask("");
    setTodoList(
      todoList.map((item) => {
        if (item.id === id) {
          return task;
        } else {
          return item;
        }
      })
    );
    setEditingTaskId(null);
  }

  function handleDelete(id) {
    setTodoList(todoList.filter((item) => item.id !== id));
  }

  function handleEdit(id) {
    setEditingTaskId(id);
  }

  const list = sortedList.map(({ id, todo, done, hashtag }) => {
    return (
      <div key={id} className={done ? "item doneItem" : "item"}>
        <img
          id="deleteIcon"
          alt="deleteIacon"
          src={deleteIcon}
          onClick={() => handleDelete(id)}
        />
        <div onClick={() => handleEdit(id)} className="item__todo">
          <b>{todo}</b> <u>{hashtag}</u>
        </div>
        <div className="item__done">
          <Checkbox
            color="success"
            sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
            onChange={() => handleChangeDone(id)}
            checked={done}
          ></Checkbox>
        </div>
        {editingTaskId === id && (
          <div id="editModalBackground" onClick={() => setEditingTaskId(null)}>
            <div id="editModalWrapper" onClick={(e) => e.stopPropagation()}>
              <form onSubmit={(e) => handleAddNewTask(e, editedTask, id)}>
                <p>Editing a task</p>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                  placeholder={todo + " " + hashtag}
                ></input>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  });

  return <div id="itemsWrapper">{list}</div>;
}

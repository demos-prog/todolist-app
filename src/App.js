import { useEffect, useState } from "react";
import "./null_styles.css";
import "./App.css";
import { Button } from "@material-ui/core";
import AddNewTask from "./components/addNewTaskModal/addNewTaskModal";
import List from "./components/list/List";
import SortComp from "./components/sortComp/sortComp";
import HashTagList from "./components/hashTagList/hashTagList";

let arr = [
  { id: 1, todo: "eat", hashtag: "#food", done: false },
  { id: 2, todo: "sleep", hashtag: "#action", done: true },
  { id: 3, todo: "drink", hashtag: "#food", done: false },
  { id: 4, todo: "fight", hashtag: "", done: true },
];

class TodoItem {
  constructor(id, todo, hashtag, done) {
    this.id = id;
    this.todo = todo;
    this.hashtag = hashtag;
    this.done = done;
  }
}

function App() {
  const [todoList, setTodoList] = useState(arr);
  const [sortedList, setSortedList] = useState(todoList);
  const [sortParam, setSortParam] = useState("ALL");
  const [arrOfTags, setArrOfTags] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    switch (sortParam) {
      case "ALL":
        setSortedList(todoList);
        break;

      case "Done":
        setSortedList(todoList.filter(({ done }) => done === true));
        break;

      case "Not done":
        setSortedList(todoList.filter(({ done }) => done === false));
        break;

      default:
        setSortedList(todoList.filter(({ hashtag }) => hashtag === sortParam));
        break;
    }
  }, [sortParam, todoList]);

  return (
    <div id="app">
      <SortComp
        setArrOfTags={setArrOfTags}
        todoList={todoList}
        setSortParam={setSortParam}
      ></SortComp>
      <p style={{ opacity: 0.5, marginTop: 20 }}>Click on task to edit.</p>
      <List
        arrOfTags={arrOfTags}
        setArrOfTags={setArrOfTags}
        TodoItem={TodoItem}
        setTodoList={setTodoList}
        todoList={todoList}
        sortedList={sortedList}
      ></List>
      <Button
        style={{
          marginTop: 30,
          boxShadow: "2px 2px 8px 0px rgba(34, 60, 80, 0.4)",
        }}
        size="large"
        variant="outlined"
        onClick={() => setShowModal(true)}
      >
        Add new task
      </Button>
      <HashTagList
        arrOfTags={arrOfTags}
        todoList={todoList}
        setTodoList={setTodoList}
      ></HashTagList>
      {showModal && (
        <AddNewTask
          setShowModal={setShowModal}
          todoList={todoList}
          setTodoList={setTodoList}
          arrOfTags={arrOfTags}
          setArrOfTags={setArrOfTags}
          TodoItem={TodoItem}
        ></AddNewTask>
      )}
    </div>
  );
}

export default App;

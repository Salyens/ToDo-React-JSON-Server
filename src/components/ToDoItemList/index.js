import { useState } from "react";
import ToDoItem from "../ToDoItem";

const ToDoItemList = ({ todos, setToDos, onSetError }) => {
  const [editId, setEditId] = useState(null);

  if (!todos.length) return "No data";
  const toDoList = todos.map((todo) => (
    <ToDoItem setToDos={setToDos} todo={todo} onSetError={onSetError} onSetEditId={{editId, setEditId}} key={`toDoItem-${todo.id}`} />
  ));
  return <ul>{toDoList}</ul>;
};
export default ToDoItemList;

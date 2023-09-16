import { useState } from "react";
import ToDoItem from "../ToDoItem";

const ToDoItemList = ({ onSetToDos, onSetError }) => {
  const [editId, setEditId] = useState(null);
  const {toDos, setToDos} = onSetToDos
  if (!toDos.length) return "No data";
  const toDoList = toDos.map((toDo) => (
    <ToDoItem onSetToDos={{toDo, setToDos}} onSetError={onSetError} onSetEditId={{editId, setEditId}} key={`toDoItem-${toDo.id}`} />
  ));
  return <ul>{toDoList}</ul>;
};
export default ToDoItemList;

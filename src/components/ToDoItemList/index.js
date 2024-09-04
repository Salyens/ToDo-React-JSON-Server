import { useState } from "react";
import ToDoItem from "../ToDoItem";
import {
  TransitionGroup,
  CSSTransition,
} from "react-transition-group";
import "./todoitemlist.css";
import { useSelector } from "react-redux";

const ToDoItemList = () => {
  const [selectedId, setSelectedId] = useState(null);
  const todos = useSelector((state) => state.todos.todos);

  if (!todos.length) return "No data";

  return (
    <TransitionGroup>
      {todos.map((toDo) => (
        <CSSTransition
          key={toDo.id}
          timeout={500}
          classNames="todo"
        >
          <ul>
            <ToDoItem
              toDo={toDo}
              selectedId={selectedId}
              onSetSelectedId={setSelectedId}
            />
          </ul>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};
export default ToDoItemList;

import { useContext, useState } from "react";
import ToDoItem from "../ToDoItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ToDoContext from "../../contexts/ToDoContext";
import "./todoitemlist.css";

const ToDoItemList = () => {
  const [editId, setEditId] = useState(null);
  const { toDos } = useContext(ToDoContext);
  
  if (!toDos.length) return "No data";

  return (
    <TransitionGroup>
      {toDos.map((toDo) => (
        <CSSTransition key={toDo.id} timeout={500} classNames="todo">
          <ul>
            <ToDoItem toDo={toDo} onSetEditId={{ editId, setEditId }} />
          </ul>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};
export default ToDoItemList;

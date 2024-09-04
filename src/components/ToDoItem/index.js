import { useEffect, useState } from "react";
import "./todoitem.css";
import {
  deleteTodo,
  toggleStatus,
} from "../../store/todoSlice";
import { useDispatch, useSelector } from "react-redux";

const ToDoItem = ({
  toDo,
  selectedId,
  onSetSelectedId,
}) => {
  const [input, setInput] = useState(toDo.title);
  const dispatch = useDispatch();  const { status, error } = useSelector(
    (state) => state.todos
  );

  const handleEditToggle = () => {
    if (selectedId) return;
    onSetSelectedId(toDo.id);
  };

  return (
    <li
      className={
        toDo.completed
          ? "todo-completed todo-enter todo-enter-active"
          : ""
      }
    >
      <div className="edit-delete">
        {/* {status === 'loading' && <p>Loading...</p>} */}
        <span className="edit-icon">
          {selectedId === toDo.id ? (
            <i
              onClick={() => onSetSelectedId(null)}
              className="fa fa-save edit-active"
            ></i>
          ) : (
            <i
              onClick={handleEditToggle}
              className="fa fa-edit"
            ></i>
          )}
        </span>
        <span
          onClick={() => dispatch(deleteTodo(toDo.id))}
          className="delete-icon"
        >
          <i className="fa fa-trash-o"></i>
        </span>
      </div>
      <input
        className={
          toDo.completed
            ? "line-through to-do-text"
            : "to-do-text"
        }
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={selectedId !== toDo.id}
      />
      <div
        onClick={() => dispatch(toggleStatus(toDo.id))}
        className="done"
      >
        <i className="fa fa-check-circle"></i>
      </div>
    </li>
  );
};

export default ToDoItem;

import { useState } from "react";

import "./todoinput.css";
import { useDispatch } from "react-redux";
import { addNewTodo } from "../../store/todoSlice";

const ToDoInput = () => {
  const [toDo, setToDo] = useState("");
  const dispatch = useDispatch();

  return (
    <>
      <h1 className="title">ToDo App</h1>
      {/* {error && <div id="msg">{error}</div>} */}
      <div id="to-do-add-wrapper">
        <input
          value={toDo}
          onInput={(event) => setToDo(event.target.value)}
          type="text"
          id="to-do-input"
          placeholder="Enter your task"
          required
        />
        <button
          onClick={() => dispatch(addNewTodo(toDo))}
          id="to-do-add"
        >
          <i className="fa fa-plus"></i>
        </button>
      </div>
    </>
  );
};
export default ToDoInput;

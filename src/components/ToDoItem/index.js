import { useContext, useState } from "react";
import ApiService from "../../services/ApiService";
import ToDoContext from "../../contexts/ToDoContext";
import "./todoitem.css";

const ToDoItem = ({ onSetEditId, toDo }) => {
  const { setToDos, setError } = useContext(ToDoContext);
  const { editId, setEditId } = onSetEditId;
  const [input, setInput] = useState(toDo.text);
  const apiService = new ApiService();

  const handleDeleteToDo = async () => {
    try {
      const deleted = await apiService.delete(toDo.id);

      setError("");

      if (deleted.status === 200)
        setToDos((toDoList) => toDoList.filter((item) => item.id !== toDo.id));
    } catch (_) {
      setError("Something went wrong");
    }
  };

  const handleDoneToDo = async () => {
    try {
      if (editId) return setError("Complete the editing");
      const done = await apiService.done(toDo.id, toDo.checked);

      setError("");

      if (done.status === 200) {
        setToDos((toDoList) => {
          const newToDoList = toDoList.map((item) => {
            if (item.id === toDo.id) {
              item.checked = !item.checked;
            }
            return item;
          });
          return newToDoList
            .toSorted((a, b) => b.id - a.id)
            .toSorted((a, b) => a.checked - b.checked);
        });
      }
    } catch (_) {
      setError("Something went wrong");
    }
  };

  const handleUpdateToDo = async (mode) => {
    try {
      if (toDo.checked)
        return setError("It's impossible to change a completed task");
      setError("");
      if (mode === "edit") setEditId(toDo.id);
      else if (mode === "save") {
        if (!input) return setError("Empty value is not allowed");
        const updated = await apiService.update(toDo.id, input);

        if (updated) {
          setToDos((toDoList) => {
            const newToDoList = toDoList.map((item) => {
              if (item.id === toDo.id) {
                item = updated.data;
              }
              return item;
            });
            return newToDoList
              .toSorted((a, b) => b.id - a.id)
              .toSorted((a, b) => a.checked - b.checked);
          });
          setEditId(null);
        }
      }
    } catch (_) {
      setError("Something went wrong");
    }
  };

  return (
    <li
      className={
        toDo.checked ? "todo-checked todo-enter todo-enter-active" : ""
      }
    >
      <div className="edit-delete">
        <span className="edit-icon">
          {Boolean(editId) && editId === toDo.id ? (
            <i
              onClick={() => handleUpdateToDo("save")}
              className="fa fa-save edit-active"
            ></i>
          ) : (
            <i
              onClick={() => handleUpdateToDo("edit")}
              className="fa fa-edit"
            ></i>
          )}
        </span>
        <span onClick={handleDeleteToDo} className="delete-icon">
          <i className="fa fa-trash-o"></i>
        </span>
      </div>
      <input
        className={toDo.checked ? "line-through to-do-text" : "to-do-text"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={
          Boolean(editId) && editId !== toDo.id
            ? Boolean(editId)
            : !Boolean(editId)
        }
      />
      <div onClick={handleDoneToDo} className="done">
        <i className="fa fa-check-circle"></i>
      </div>
    </li>
  );
};

export default ToDoItem;

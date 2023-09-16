import { useState } from "react";
import ApiService from "../../services/ApiService";
import "./todoitem.css";

const ToDoItem = ({ onSetToDos, onSetError, onSetEditId }) => {
  const { editId, setEditId } = onSetEditId;
  const { toDo, setToDos } = onSetToDos;
  const [input, setInput] = useState(toDo.text);
  const apiService = new ApiService();

  const handleDeleteToDo = async () => {
    try {
      const deleted = await apiService.delete(toDo.id);

      onSetError("");

      if (deleted.status === 200)
        setToDos((toDoList) => toDoList.filter((item) => item.id !== toDo.id));
    } catch (_) {
      onSetError("Something went wrong");
    }
  };

  const handleDoneToDo = async () => {
    try {
      const done = await apiService.done(toDo.id, toDo.checked);

      onSetError("");

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
      onSetError("Something went wrong");
    }
  };

  const handleUpdateToDo = async (mode) => {
    try {
      if (toDo.checked)
        return onSetError("It's impossible to change a completed task");
      onSetError("");
      if (mode === "edit") setEditId(toDo.id);
      else if (mode === "save") {
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
    } catch (_) {}
  };

  return (
    <li>
      <div className="edit-delete">
        <span className="edit-icon">
          {Boolean(editId) && editId === toDo.id && !toDo.checked ? (
            <i
              onClick={() => handleUpdateToDo("save")}
              className="fa fa-save"
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

import { useState } from "react";
import ApiService from "../../services/ApiService";
import "./todoitem.css";

const ToDoItem = ({ todo, setToDos, onSetError, onSetEditId }) => {
  const { editId, setEditId } = onSetEditId;
  const apiService = new ApiService();
  const [input, setInput] = useState(todo.text);

  const handleDeleteToDo = async () => {
    try {
      const deleted = await apiService.delete(todo.id);
      if (deleted.status === 200)
        setToDos((toDoList) => toDoList.filter((item) => item.id !== todo.id));
    } catch (_) {
      onSetError("Something went wrong");
    }
  };

  const handleDoneToDo = async () => {
    try {
      const done = await apiService.done(todo.id);
      if (done.status === 200) {
        setToDos((toDoList) => {
          const newToDoList = toDoList.map((item) => {
            if (item.id === todo.id) {
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
      setEditId(todo.id);

      const updated = await apiService.update(todo.id, input);

      if (updated) {
        setToDos((toDoList) => {
          const newToDoList = toDoList.map((item) => {
            if (item.id === todo.id) {
              item = updated;
            }
            return item;
          });
          return newToDoList
            .toSorted((a, b) => b.id - a.id)
            .toSorted((a, b) => a.checked - b.checked);
        });
        setEditId(null);
      }
    } catch (_) {}
  };

  return (
    <li>
      <div className="edit-delete">
        <span onClick={()=> handleUpdateToDo('save')} className="edit-icon">
          {editId && editId === todo.id ? (
            <i className="fa fa-save"></i>
          ) : (
            <i className="fa fa-edit"></i>
          )}
        </span>
        <span onClick={handleDeleteToDo} className="delete-icon">
          <i className="fa fa-trash-o"></i>
        </span>
      </div>
      <input
        className={todo.checked ? "line-through to-do-text" : "to-do-text"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={Boolean(editId)}
      />
      <div onClick={handleDoneToDo} className="done">
        <i className="fa fa-check-circle"></i>
      </div>
    </li>
  );
};

export default ToDoItem;

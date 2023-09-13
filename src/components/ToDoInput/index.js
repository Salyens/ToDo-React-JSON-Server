import { useState } from "react";
import ApiService from "../../services/ApiService";
import "./todoinput.css";

const ToDoInput = ({ onToDoAdd }) => {
  const apiService = new ApiService();
  const [toDo, setToDo] = useState("");
  const [error, setError] = useState("");

  const handleCreateToDo = async () => {
    try {
      if (!toDo.trim()) return setError("Invalid text");
      const newToDo = await apiService.add({ text: toDo, checked: false });

      if (newToDo.status === 201) {
        onToDoAdd((todos) => [...todos, newToDo.data]);
        setToDo("");
      }
    } catch (_) {
      setError("Something went wrong");
    }
  };

  return (
    <>
      {error && <div id="msg">{error}</div>}
      <div id="to-do-add-wrapper">
        <input
          value={toDo}
          onInput={(event) => setToDo(event.target.value)}
          type="text"
          id="to-do-input"
          required
        />
        <button onClick={handleCreateToDo} id="to-do-add">
          <i className="fa fa-plus"></i>
        </button>
      </div>
    </>
  );
};
export default ToDoInput;

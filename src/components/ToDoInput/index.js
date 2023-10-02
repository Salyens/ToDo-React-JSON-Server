import { useContext, useState } from "react";
import ApiService from "../../services/ApiService";
import ToDoContext from "../../contexts/ToDoContext";
import "./todoinput.css";

const ToDoInput = () => {
  const { error, setError, setToDos } = useContext(ToDoContext);
  console.log(setToDos);
  const [toDo, setToDo] = useState("");
  const apiService = new ApiService();

  const handleCreateToDo = async () => {
    try {
      if (!toDo.trim()) return setError("Invalid text");
      const newToDo = await apiService.add({ text: toDo, checked: false });

      if (newToDo.status === 201) {

        setToDos((state) => {

          // state.toDos = [...state.toDos, newToDo.data]
          //   .toSorted((a, b) => b.id - a.id)
          //   .toSorted((a, b) => a.checked - b.checked);
          // return state;
        });
        setToDo("");
        setError("");
      }
    } catch (_) {
      setError("Something went wrong");
    }
  };

  return (
    <>
      <h1 className="title">ToDo App</h1>
      {error && <div id="msg">{error}</div>}
      <div id="to-do-add-wrapper">
        <input
          value={toDo}
          onInput={(event) => setToDo(event.target.value)}
          type="text"
          id="to-do-input"
          placeholder="Enter your task"
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

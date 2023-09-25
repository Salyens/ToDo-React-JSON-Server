import { useEffect, useState } from "react";
import ToDoInput from "../ToDoInput";
import ToDoItemList from "../ToDoItemList";
import ApiService from "../../services/ApiService";
import "./app.css";
import ToDoContext from "../../contexts/ToDoContext";

const App = () => {
  const [toDos, setToDos] = useState([]);
  const [error, setError] = useState("");

  const apiService = new ApiService();

  const getAll = () => {
    apiService.get().then((res) => {
      if (res.status === 200)
        setToDos(
          res.data
            .toSorted((a, b) => b.id - a.id)
            .toSorted((a, b) => a.checked - b.checked)
        );
    });
  };
  useEffect(() => getAll(), []);

  return (
    <div id="to-do-list">
      <ToDoContext.Provider value={{ toDos, setToDos, error, setError }}>
        <ToDoInput />
        <ToDoItemList />
      </ToDoContext.Provider>
    </div>
  );
};

export default App;

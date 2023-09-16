import { useEffect, useState } from "react";
import ToDoInput from "../ToDoInput";
import ToDoItemList from "../ToDoItemList";
import ApiService from "../../services/ApiService";
import "./app.css";

const App = () => {
  const [toDos, setToDos] = useState([]);
  const [error, setError] = useState("");

  const apiService = new ApiService();

  const getAll = () => {
    apiService.get().then((res) => {
      if (res.status === 200) setToDos(res.data);
    });
  };
  useEffect(() => getAll(), []);

  return (
    <div id="to-do-list">
      <ToDoInput onToDoAdd={setToDos} onSetError={{error, setError}} />
      <ToDoItemList setToDos={setToDos} todos={toDos} onSetError={setError}/>
    </div>
  );
};

export default App;

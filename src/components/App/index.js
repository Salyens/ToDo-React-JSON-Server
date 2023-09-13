import { useEffect, useState } from "react";
import ToDoInput from "../ToDoInput";
import ToDoItemList from "../ToDoItemList";
import ApiService from "../../services/ApiService";
import "./app.css";

const App = () => {
  const [toDos, setToDos] = useState([]);
  const apiService = new ApiService();

  const getAll = () => {
    apiService.get().then((res) => {
      if (res.status === 200) setToDos(res.data);
    });
  };
  useEffect(() => getAll(), []);

  return (
    <div id="to-do-list">
      <ToDoInput onToDoAdd = {setToDos} />
      <ToDoItemList todos={toDos}/>
    </div>
  );
};

export default App;

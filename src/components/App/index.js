import { useEffect } from "react";
import ToDoInput from "../ToDoInput";
import ToDoItemList from "../ToDoItemList";
import "./app.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../../store/todoSlice";

const App = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector(
    (state) => state.todos
  );

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div id="to-do-list">
      {status === "loading" && <h2>Loading...</h2>}
      {error && <h2>An error occurred: {error}</h2>}
      <ToDoInput />
      <ToDoItemList />
    </div>
  );
};

export default App;

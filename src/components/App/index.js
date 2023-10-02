import { Component } from "react";
import ToDoInput from "../ToDoInput";
import ToDoItemList from "../ToDoItemList";
import ApiService from "../../services/ApiService";
import "./app.css";
import ToDoContext from "../../contexts/ToDoContext";

class App extends Component {
  state = { toDos: [], error: "" };
  apiService = new ApiService();
  async componentDidMount() {
    const toDos = await this.apiService.get();
    this.setToDos(toDos.data);
  }

  setToDos = (toDos) => {
    this.setState((state) => {
      state.toDos = toDos;
      return state;
    });
  };

  setError = (error) => {
    this.setState((state) => {
      state.error = error;
      return state;
    });
  };

  render() {
    return (
      <div id="to-do-list">
        <ToDoContext.Provider
          value={{
            toDos: this.state.toDos,
            setToDos: this.setToDos,
            error: this.state.error,
            setError: this.setError,
          }}
        >
          <ToDoInput />
          <ToDoItemList />
        </ToDoContext.Provider>
      </div>
    );
  }
}

export default App;

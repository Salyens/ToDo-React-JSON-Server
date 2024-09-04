import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async function (_, { rejectWithValue }) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE}?_sort=checked&_order=asc`
      );
      if (response.status !== 200) {
        throw new Error("Server Error!");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      }
      dispatch(removeToDo({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleStatus = createAsyncThunk(
  "todos/toggleStatus",
  async function (
    id,
    { rejectWithValue, dispatch, getState }
  ) {
    const todo = getState().todos.todos.find(
      (todo) => todo.id === id
    );
    try {
      const response = await axios.patch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        { completed: !todo.completed }
      );

      if (response.status !== 200) {
        throw new Error("Server Error!");
      }

      dispatch(toggleTodoComplete({ id }));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",
  async function (text, { rejectWithValue, dispatch }) {
    try {
      const todo = {
        title: text,
        userId: 1,
        completed: false,
      };

      const response = await axios.post(
        process.env.REACT_APP_API_BASE,
        todo
      );

      console.log("response: ", response);

      if (response.status !== 201) {
        throw new Error("Server Error!");
      }
      dispatch(addTodo(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    removeToDo(state, action) {
      state.todos = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
    },
    toggleTodoComplete(state, action) {
      const toggledTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      toggledTodo.completed = !toggledTodo.completed;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "resolved";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, setError)
      .addCase(deleteTodo.rejected, setError)
      .addCase(toggleStatus.rejected, setError)
      .addCase(toggleStatus.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(toggleStatus.fulfilled, (state, action) => {
        state.status = "resolved";
        const toggledTodo = state.todos.find(
          (todo) => todo.id === action.payload.id
        );
        if (toggledTodo) {
          toggledTodo.completed = action.payload.completed;
        }
      })
      .addCase(addNewTodo.rejected, setError);
  },
});

const { addTodo, removeToDo, toggleTodoComplete } =
  todoSlice.actions;

export default todoSlice.reducer;

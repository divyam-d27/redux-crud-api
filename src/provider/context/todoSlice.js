import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    allTodos: [],
    edit: { todo: {}, isEditing: false },
    isLoading: false,
    isError: false,
    isSuccess: false,
  },

  reducers: {
    edit: (curState, action) => {
      return {
        ...curState,
        edit: { todo: action.payload, isEditing: true },
      };
    },

    removeTodo: (curState, action) => {
      return {
        ...curState,
        allTodos: curState.allTodos.filter(
          (todo) => todo._id !== action.payload
        ),
      };
    },
  },

  extraReducers: (builder) => {
    builder
      // GET todos
      .addCase(getTodos.pending, (curState) => {
        curState.isLoading = true;
        curState.isError = false;
        curState.isSuccess = false;
      })
      .addCase(getTodos.fulfilled, (curState, action) => {
        curState.isLoading = false;
        curState.isError = false;
        curState.isSuccess = true;

        curState.allTodos = action.payload;
      })
      .addCase(getTodos.rejected, (curState) => {
        curState.isLoading = false;
        curState.isError = true;
        curState.isSuccess = false;
      })

      // CREATE
      .addCase(createTodo.pending, (curState) => {
        curState.isLoading = true;
        curState.isError = false;
        curState.isSuccess = false;
      })
      .addCase(createTodo.fulfilled, (curState, action) => {
        curState.isLoading = false;
        curState.isError = false;
        curState.isSuccess = true;

        curState.allTodos = [...curState.allTodos, action.payload];
      })
      .addCase(createTodo.rejected, (curState) => {
        curState.isLoading = false;
        curState.isError = true;
        curState.isSuccess = false;
      })

      // UPDATE
      .addCase(updateTodo.pending, (curState) => {
        curState.isLoading = true;
        curState.isError = false;
        curState.isSuccess = false;
      })
      .addCase(updateTodo.fulfilled, (curState, action) => {
        curState.isLoading = false;
        curState.isError = false;
        curState.isSuccess = true;

        curState.allTodos = curState.allTodos.map((todo) =>
          todo._id === action.payload._id ? action.payload : todo
        );

        curState.edit = { todo: {}, isEditing: false };
      })
      .addCase(updateTodo.rejected, (curState) => {
        curState.isLoading = false;
        curState.isError = true;
        curState.isSuccess = false;
      })

      // DELETE
      .addCase(deleteTodo.pending, (curState) => {
        curState.isLoading = true;
        curState.isError = false;
        curState.isSuccess = false;
      })
      .addCase(deleteTodo.fulfilled, (curState) => {
        curState.isLoading = false;
        curState.isError = false;
        curState.isSuccess = true;
      })
      .addCase(deleteTodo.rejected, (curState) => {
        curState.isLoading = false;
        curState.isError = true;
        curState.isSuccess = false;
      });
  },
});

export const { edit, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;

// Using THUNK for APIs

// FETCH
export const getTodos = createAsyncThunk("FETCH/TODOS", async () => {
  const response = await axios.get("/api/todo");
  return response.data;
});

// CREATE
export const createTodo = createAsyncThunk("ADD/TODO", async (formData) => {
  const response = await axios.post("/api/todo", formData);

  return response.data;
});

// DELETE
export const deleteTodo = createAsyncThunk("DELETE/TODO", async (id) => {
  const response = await axios.delete(`/api/todo/${id}`);

  return response.data;
});

// UPDATE
export const updateTodo = createAsyncThunk("UPDATE/TODO", async (todo) => {
  const response = await axios.put(`/api/todo/${todo._id}`, todo);
  return response.data;
});

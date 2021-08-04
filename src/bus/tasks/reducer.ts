// Core
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

// Interfaces
import {IInitialStateTask, ITask} from "./interface";

const initialState: IInitialStateTask = {
  tasks: [],
  loader: false,
  error: {
    message: '',
    status: false,
  }
};

export const asyncFetchData = createAsyncThunk(
  'task/FetchingData',
  async () => {
    const response = await fetch('http://localhost:7070/api/services');
    const tasks = await response.json();
    if (!response.ok) {
      throw new Error('Что-то пошло не так...')
    }
    return tasks;
  })

export const asyncDeleteTask = createAsyncThunk(
  'task/DeleteTask',
  async (id: string) => {
    const response = await fetch(`http://localhost:7070/api/services/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Что-то пошло не так...')
    }
    return id;
  })


const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder => {
    builder.addCase(asyncFetchData.pending,
      (state) => {
        state.loader = true;
        state.error = {
          message: '',
          status: false,
        }
      }
    );
    builder.addCase(asyncFetchData.fulfilled,
      (state, action: PayloadAction<ITask[]>) => {
        state.tasks = [...action.payload];
        state.loader = false;
      }
    );
    builder.addCase(asyncFetchData.rejected,
      (state, action) => {
      state.loader = false;
        state.error = {
          message: String(action.error.message),
          status: true,
        }
      }
    );
    builder.addCase(asyncDeleteTask.pending,
      (state) => {
        state.loader = true;
        state.error = {
          message: '',
          status: false,
        }
      }
    );
    builder.addCase(asyncDeleteTask.fulfilled,
      (state, action) => {
        const newState = state.tasks.filter(task => task.id !== action.payload);
        state.tasks = [...newState];
        state.loader = false;
      }
    );
    builder.addCase(asyncDeleteTask.rejected,
      (state, action) => {
        state.loader = false;
        state.error = {
          message: String(action.error.message),
          status: true,
        }
      }
    );
  })
})

export default taskSlice.reducer



// Core
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// Interfaces
import {IInitialStateTask, ITask} from "./interface";

const initialState: IInitialStateTask = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    fetchTasks(state, action:PayloadAction<ITask[]>) {
      state.tasks = [...action.payload];
    },
    deleteTask(state, action: PayloadAction<{ id: string }>) {
      const {id} = action.payload;
      const newState = state.tasks.filter(task => task.id !== id);
      state.tasks = [...newState];
    }
  }
})

export const {
  fetchTasks,
  deleteTask,
} = taskSlice.actions
export default taskSlice.reducer



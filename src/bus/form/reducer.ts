// Core
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

// Interfaces
import {IForm, IPayloadForm} from './interface';
import {ITask} from "../tasks/interface";

declare global {
  type State<T> = { [key: string]: T };
}

const initialState: IForm = {
  name: '',
  price: '',
  content: '',
  loader: false,
  error: {
    message: '',
    status: false
  }
}

export const asyncEditFetchData = createAsyncThunk(
  'form/EditFetchingData',
  async (id: string) => {
    const response = await fetch(`http://localhost:7070/api/services/${id}`);
    const tasks = await response.json();
    if (!response.ok) {
      throw new Error('Что-то пошло не так...')
    }
    return tasks;
  })

export const asyncEditSavingData = createAsyncThunk(
  'form/EditSavingData',
  async (payload: ITask) => {
    const response = await fetch(`http://localhost:7070/api/services/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...payload, id: Number(payload.id)}),
    });
    if (!response.ok) {
      throw new Error('Что-то пошло не так...')
    }
    return;
  })

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    changeValue(state: State<string | {} | boolean>, action: PayloadAction<{ type: string, value: string }>) {
      const {type, value} = action.payload;
      state[type] = value;
    },
    clearForm(state) {
      state.name = '';
      state.price = '';
      state.content = '';
    }
  },
  extraReducers: builder => {
    builder.addCase(asyncEditFetchData.pending,
      (state) => {
        state.loader = true;
        state.error = {
          message: '',
          status: false,
        }
      }
    );
    builder.addCase(asyncEditFetchData.fulfilled,
      (state, action: PayloadAction<IPayloadForm>) => {
        state.name = action.payload.name;
        state.price = action.payload.price;
        state.content = action.payload.content;
        state.loader = false;
      }
    );
    builder.addCase(asyncEditFetchData.rejected,
      (state, action) => {
        state.loader = false;
        state.error = {
          message: String(action.error.message),
          status: true,
        }
      }
    );
    builder.addCase(asyncEditSavingData.pending,
      (state) => {
        state.loader = true;
        state.error = {
          message: '',
          status: false,
        }
      }
    );
    builder.addCase(asyncEditSavingData.fulfilled,
      (state) => {
        state.loader = false;
        state.name = '';
        state.price = '';
        state.content = '';
      }
    );
    builder.addCase(asyncEditSavingData.rejected,
      (state, action) => {
        state.loader = false;
        state.error = {
          message: String(action.error.message),
          status: true,
        }
      }
    );
  }
});

export const {clearForm, changeValue} = formSlice.actions;
export default formSlice.reducer;

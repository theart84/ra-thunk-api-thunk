// Core
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ErrorType} from "./types";

const initialState: ErrorType = {
  message: 'Что-то пошло не так...',
  status: false,
}

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<{message: string, status: boolean}>) {
      const {message, status} = action.payload;
      state.message = message;
      state.status = status;
    }
  }
})

export const {setError} = errorSlice.actions;
export default errorSlice.reducer;

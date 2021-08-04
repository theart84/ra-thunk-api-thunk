// Core
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoaderType} from "./types";

const initialState: LoaderType = {
  loader: false,
}

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    changeStatusLoader(state, action: PayloadAction<boolean>) {
      state.loader = action.payload;
    }
  }
})

export const {changeStatusLoader} = loaderSlice.actions;
export default loaderSlice.reducer;

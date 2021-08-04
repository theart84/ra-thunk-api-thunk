// Core
import {configureStore} from "@reduxjs/toolkit";

// RootReducer
import {rootReducer} from "../bus";

const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>
export default store;

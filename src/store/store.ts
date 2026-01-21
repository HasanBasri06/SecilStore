import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import collectionReducer from "./slices/collectionSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    collection: collectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  email: string;
  password: string;
  error: string;
  loading: boolean;
}

const initialState: LoginState = {
  email: "",
  password: "",
  error: "",
  loading: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetForm: (state) => {
      state.email = "";
      state.password = "";
      state.error = "";
      state.loading = false;
    },
  },
});

export const { setEmail, setPassword, setError, setLoading, resetForm } =
  loginSlice.actions;

export default loginSlice.reducer;

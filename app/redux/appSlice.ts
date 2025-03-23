import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  isLoggedIn: boolean;
} = {
  isLoggedIn: false
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload.string;
    },
  },
});

export const { setLoggedIn } = appSlice.actions;
export default appSlice.reducer;
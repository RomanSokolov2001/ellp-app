import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  memberId: string;
  email: string;
  jwt: string;
  username: string;
  firstName: string;
  lastName: string;
  memberSince: string;
  accountState: string; // TODO: replace with proper type when available
}

const initialState: { user: User | null } = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;

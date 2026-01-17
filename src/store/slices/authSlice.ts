import { User } from '../../types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  user: User;
  activeProfileTab: 'details' | 'activity' | 'password';
}
// slices/userSlice.ts


const initialState: UserState = {
  user: {
    id: '1',
    name: 'NagaPraveen Ramisetti',
    email: 'nagapraveen.ramisetti@visaka.in',
    phone: '8125515706',
    department: 'Admin',
    staffId: 'EMP-001',
  },

  activeProfileTab: 'details',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setActiveProfileTab: (state, action: PayloadAction<'details' | 'activity' | 'password'>) => {
      state.activeProfileTab = action.payload;
    },
    updatePassword: (state, action: PayloadAction<{ currentPassword: string; newPassword: string }>) => {
      // Handle password update logic here
      console.log('Password updated');
    },
    logout: (state) => {
      // Handle logout logic
      console.log('User logged out');
    },
  },
});

export const { setActiveProfileTab, updatePassword, logout } = userSlice.actions;
export default userSlice.reducer;
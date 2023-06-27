import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the user state
interface UserState {
  name: string;
  // add other user properties
}

// Define the initial state using that type
const initialState: UserState = {
  name: '',
  // add other user properties
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    // Define other actions here
  },
});

// Export actions
export const { setName } = userSlice.actions;

// Export reducer
export default userSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the user state
interface UserState {
  name: string;
  roomCode: string;
  // add other user properties
}

// Define the initial state using that type
const initialState: UserState = {
  name: '',
  roomCode: '',
  // add other user properties
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setRoomCode: (state, action: PayloadAction<string>) => { 
      state.roomCode = action.payload;
    },
    //define more actions here
  },
});

// Export actions
export const { setName, setRoomCode } = userSlice.actions;

// Export reducer
export default userSlice.reducer;

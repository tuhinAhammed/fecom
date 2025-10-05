import { createSlice } from '@reduxjs/toolkit'

// Get initial state from localStorage if available
const getInitialState = () => {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      return {
        user: JSON.parse(storedUser),
        token: storedToken,
      };
    }
  }
  
  return {
    user: null,
    token: null,
  };
};

const initialState = getInitialState();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      
      // Clear from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    },
  },
})

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
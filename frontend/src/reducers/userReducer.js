import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  username: null,
  name: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => { //login
      return action.payload
    },
    resetUser: () => { //logout
      return initialState
    }
  }
})

export const { setUser, resetUser } = userSlice.actions;

export const signIn = (username, password) => {
  return async (dispatch) => {
    const user = null; // TODO: some validation
    dispatch(setUser(user));
  }
}

export default userSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
const initialState = { name: 'Guest', isLoggedIn: false }
export default createSlice({ name: 'user', initialState, reducers: {} }).reducer

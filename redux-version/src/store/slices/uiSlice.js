import { createSlice } from '@reduxjs/toolkit'
const initialState = { theme: 'light', notification: null }
export default createSlice({ name: 'ui', initialState, reducers: {} }).reducer

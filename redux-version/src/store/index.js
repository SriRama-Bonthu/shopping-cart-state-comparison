import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import userReducer from './slices/userSlice'
import uiReducer from './slices/uiSlice'

export default configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    ui: uiReducer
  }
})

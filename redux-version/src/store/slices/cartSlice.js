import { createSlice } from '@reduxjs/toolkit'

const initialState = { items: [], isOpen: false }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action){
      const existing = state.items.find(i => i.productId === action.payload.productId)
      if(existing) existing.quantity += 1
      else state.items.push({ ...action.payload, quantity: 1 })
    },
    toggle(state){ state.isOpen = !state.isOpen }
  }
})

export const { addItem, toggle } = cartSlice.actions
export default cartSlice.reducer

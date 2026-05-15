import React, { createContext, useReducer } from 'react'

const initialState = {
  cart: { items: [], isOpen: false },
  user: { name: 'Guest', isLoggedIn: false },
  ui: { theme: 'light', notification: null }
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.cart.items.find(i => i.productId === action.payload.productId)
      let items
      if (existing) {
        items = state.cart.items.map(i => i.productId === action.payload.productId ? { ...i, quantity: i.quantity + 1 } : i)
      } else {
        items = [...state.cart.items, { ...action.payload, quantity: 1 }]
      }
      return { ...state, cart: { ...state.cart, items } }
    }
    case 'TOGGLE_CART':
      return { ...state, cart: { ...state.cart, isOpen: !state.cart.isOpen } }
    default:
      return state
  }
}

export const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

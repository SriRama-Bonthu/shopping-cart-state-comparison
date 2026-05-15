import React, { createContext, useReducer, useContext } from 'react'

const initial = { items: [], isOpen: false }
function reducer(state, action){
  switch(action.type){
    case 'ADD_ITEM':{
      const existing = state.items.find(i => i.productId === action.payload.productId)
      let items
      if(existing) items = state.items.map(i=>i.productId===action.payload.productId?{...i,quantity:i.quantity+1}:i)
      else items = [...state.items,{...action.payload,quantity:1}]
      return {...state, items}
    }
    case 'TOGGLE': return {...state, isOpen: !state.isOpen}
    default: return state
  }
}

const CartContext = createContext(null)
export function CartProvider({children}){
  const [state, dispatch] = useReducer(reducer, initial)
  return <CartContext.Provider value={{state, dispatch}}>{children}</CartContext.Provider>
}
export function useCart(){
  return useContext(CartContext)
}

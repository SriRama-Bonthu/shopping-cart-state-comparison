import React, { useContext, useRef } from 'react'
import { AppContext } from '../context/AppContext'

export default function Header(){
  const { state, dispatch } = useContext(AppContext)
  const renders = useRef(0)
  renders.current++
  const count = state.cart.items.reduce((s,i)=>s+i.quantity,0)
  return (
    <header>
      <h1>Shop</h1>
      <div>Welcome, {state.user.name}</div>
      <div>Items: {count}</div>
      <button onClick={() => dispatch({ type: 'TOGGLE_CART' })}>Toggle Cart</button>
      <small data-testid="render-count">{import.meta.env.MODE !== 'production' ? renders.current : ''}</small>
    </header>
  )
}

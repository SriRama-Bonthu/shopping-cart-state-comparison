import React, { useRef } from 'react'
import { useUser } from '../context/UserContext'
import { useCart } from '../context/CartContext'

export default function Header(){
  const { state: user } = useUser()
  const { state: cart, dispatch } = useCart()
  const renders = useRef(0)
  renders.current++
  const count = cart.items.reduce((s,i)=>s+i.quantity,0)
  return (
    <header>
      <h1>Shop (Optimized)</h1>
      <div>Welcome, {user.name}</div>
      <div>Items: {count}</div>
      <button onClick={() => dispatch({type:'TOGGLE'})}>Toggle Cart</button>
      <small data-testid="render-count">{import.meta.env.MODE !== 'production' ? renders.current : ''}</small>
    </header>
  )
}

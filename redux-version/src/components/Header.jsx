import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggle } from '../store/slices/cartSlice'

export default function Header(){
  const name = useSelector(s => s.user.name)
  const count = useSelector(s => s.cart.items.reduce((a,b)=>a+b.quantity,0))
  const dispatch = useDispatch()
  const renders = useRef(0)
  renders.current++
  return (
    <header>
      <h1>Shop (Redux)</h1>
      <div>Welcome, {name}</div>
      <div>Items: {count}</div>
      <button onClick={() => dispatch(toggle())}>Toggle Cart</button>
      <small data-testid="render-count">{import.meta.env.MODE !== 'production' ? renders.current : ''}</small>
    </header>
  )
}

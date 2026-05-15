import React, { useRef } from 'react'
import { useAppStore } from '../store/useAppStore'

export default function Header(){
  const name = useAppStore(state => state.user.name)
  const count = useAppStore(state => state.cart.items.reduce((s,i)=>s+i.quantity,0))
  const toggle = useAppStore(state => state.toggleCart)
  const renders = useRef(0)
  renders.current++
  return (
    <header>
      <h1>Shop (Zustand)</h1>
      <div>Welcome, {name}</div>
      <div>Items: {count}</div>
      <button onClick={toggle}>Toggle Cart</button>
      <small data-testid="render-count">{import.meta.env.MODE !== 'production' ? renders.current : ''}</small>
    </header>
  )
}

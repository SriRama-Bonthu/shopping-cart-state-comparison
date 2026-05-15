import React, { useContext, useRef } from 'react'
import { AppContext } from '../context/AppContext'

function CartItem({ item }){
  const renders = useRef(0)
  renders.current++
  return (
    <div className="cart-item">
      <div>{item.name} x {item.quantity}</div>
      <small data-testid="render-count">{import.meta.env.MODE !== 'production' ? renders.current : ''}</small>
    </div>
  )
}

export default function CartSidebar(){
  const { state } = useContext(AppContext)
  const renders = useRef(0)
  renders.current++
  if(!state.cart.isOpen) return null
  return (
    <aside className="cart-sidebar">
      <h2>Cart</h2>
      <div>
        {state.cart.items.map(i => <CartItem key={i.productId} item={i} />)}
      </div>
      <small data-testid="render-count">{import.meta.env.MODE !== 'production' ? renders.current : ''}</small>
    </aside>
  )
}

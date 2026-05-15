import React, { useRef } from 'react'
import { useSelector } from 'react-redux'

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
  const items = useSelector(s => s.cart.items)
  const isOpen = useSelector(s => s.cart.isOpen)
  const renders = useRef(0)
  renders.current++
  if(!isOpen) return null
  return (
    <aside className="cart-sidebar">
      <h2>Cart</h2>
      <div>
        {items.map(i => <CartItem key={i.productId} item={i} />)}
      </div>
      <small data-testid="render-count">{import.meta.env.MODE !== 'production' ? renders.current : ''}</small>
    </aside>
  )
}

import React, { useRef } from 'react'
import { useCart } from '../context/CartContext'

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
  const { state: cart } = useCart()
  const renders = useRef(0)
  renders.current++
  if(!cart.isOpen) return null
  return (
    <aside className="cart-sidebar">
      <h2>Cart</h2>
      <div>
        {cart.items.map(i => <CartItem key={i.productId} item={i} />)}
      </div>
      <small data-testid="render-count">{import.meta.env.MODE !== 'production' ? renders.current : ''}</small>
    </aside>
  )
}

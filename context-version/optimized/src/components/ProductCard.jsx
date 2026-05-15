import React, { useRef } from 'react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }){
  const { dispatch } = useCart()
  const renders = useRef(0)
  renders.current++
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <div>${product.price}</div>
      <button onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}>Add to Cart</button>
      <small data-testid="render-count">{import.meta.env.MODE !== 'production' ? renders.current : ''}</small>
    </div>
  )
}

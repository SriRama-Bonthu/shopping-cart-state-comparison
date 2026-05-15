import React, { useRef } from 'react'
import { useAppStore } from '../store/useAppStore'

export default function ProductCard({ product }){
  const addItem = useAppStore(state => state.addItem)
  const renders = useRef(0)
  renders.current++
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <div>${product.price}</div>
      <button onClick={() => addItem(product)}>Add to Cart</button>
      <small data-testid="render-count">{import.meta.env.MODE !== 'production' ? renders.current : ''}</small>
    </div>
  )
}

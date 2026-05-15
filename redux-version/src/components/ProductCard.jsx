import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../store/slices/cartSlice'

export default function ProductCard({ product }){
  const dispatch = useDispatch()
  const renders = useRef(0)
  renders.current++
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <div>${product.price}</div>
      <button onClick={() => dispatch(addItem(product))}>Add to Cart</button>
      <small data-testid="render-count">{import.meta.env.MODE !== 'production' ? renders.current : ''}</small>
    </div>
  )
}

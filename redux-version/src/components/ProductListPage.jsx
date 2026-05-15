import React from 'react'
import ProductCard from './ProductCard'

const products = [
  { productId: 'p1', name: 'Apple', price: 1 },
  { productId: 'p2', name: 'Banana', price: 2 },
  { productId: 'p3', name: 'Carrot', price: 3 }
]

export default function ProductListPage(){
  return (
    <section>
      <h2>Products</h2>
      <div className="product-list">
        {products.map(p => <ProductCard key={p.productId} product={p} />)}
      </div>
    </section>
  )
}

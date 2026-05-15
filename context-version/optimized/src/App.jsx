import React from 'react'
import { CartProvider } from './context/CartContext'
import { UserProvider } from './context/UserContext'
import { UIProvider } from './context/UIContext'
import Header from './components/Header'
import ProductListPage from './components/ProductListPage'
import CartSidebar from './components/CartSidebar'

export default function App(){
  return (
    <UserProvider>
      <UIProvider>
        <CartProvider>
          <div className="app">
            <Header />
            <main>
              <ProductListPage />
            </main>
            <CartSidebar />
          </div>
        </CartProvider>
      </UIProvider>
    </UserProvider>
  )
}

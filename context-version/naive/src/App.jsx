import React from 'react'
import { AppProvider } from './context/AppContext'
import Header from './components/Header'
import ProductListPage from './components/ProductListPage'
import CartSidebar from './components/CartSidebar'

export default function App() {
  return (
    <AppProvider>
      <div className="app">
        <Header />
        <main>
          <ProductListPage />
        </main>
        <CartSidebar />
      </div>
    </AppProvider>
  )
}

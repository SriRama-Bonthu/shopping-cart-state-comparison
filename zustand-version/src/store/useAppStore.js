import create from 'zustand'

export const useAppStore = create(set => ({
  cart: { items: [], isOpen: false },
  user: { name: 'Guest', isLoggedIn: false },
  ui: { theme: 'light', notification: null },
  addItem: (product) => set(state => {
    const existing = state.cart.items.find(i => i.productId === product.productId)
    let items
    if(existing) items = state.cart.items.map(i => i.productId === product.productId ? { ...i, quantity: i.quantity + 1 } : i)
    else items = [...state.cart.items, { ...product, quantity: 1 }]
    return { cart: { ...state.cart, items } }
  }),
  toggleCart: () => set(state => ({ cart: { ...state.cart, isOpen: !state.cart.isOpen } }))
}))

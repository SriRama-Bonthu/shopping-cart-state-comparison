import React, { createContext, useReducer, useContext } from 'react'

const initial = { theme: 'light', notification: null }
function reducer(s,a){
  switch(a.type){
    default: return s
  }
}

const UIContext = createContext(null)
export function UIProvider({children}){
  const [state, dispatch] = useReducer(reducer, initial)
  return <UIContext.Provider value={{state, dispatch}}>{children}</UIContext.Provider>
}
export function useUI(){ return useContext(UIContext) }

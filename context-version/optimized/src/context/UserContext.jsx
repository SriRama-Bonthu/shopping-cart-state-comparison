import React, { createContext, useReducer, useContext } from 'react'

const initial = { name: 'Guest', isLoggedIn: false }
function reducer(s,a){
  switch(a.type){
    default: return s
  }
}

const UserContext = createContext(null)
export function UserProvider({children}){
  const [state, dispatch] = useReducer(reducer, initial)
  return <UserContext.Provider value={{state, dispatch}}>{children}</UserContext.Provider>
}
export function useUser(){ return useContext(UserContext) }

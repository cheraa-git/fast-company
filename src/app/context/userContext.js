import { createContext, useContext } from 'react'


export const UserContext = createContext({
  users: [],
  onDelete: () => {
  },
  onToggleBookmark: () => {
  }
})

export const useUserContext = () => useContext(UserContext)

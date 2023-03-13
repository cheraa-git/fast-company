import { createContext, useContext } from 'react'
import { IUser } from '../../types'

export interface UserContextType {
  users: IUser[]
  onDelete: (userId: string) => void
  onToggleBookmark: (userId: string) => void
}

export const UserContext = createContext<UserContextType>({
  users: [],
  onDelete: () => {
  },
  onToggleBookmark: () => {
  }
})

export const useUserContext = () => useContext(UserContext)

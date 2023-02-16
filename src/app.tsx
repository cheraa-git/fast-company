import React, { FC, useState } from "react"
import { Users } from "./components/users"
import api from "./api"
import { SearchStatus } from "./components/searchStatus"
import { UserContext } from './context/userContext'

export const App: FC = () => {
  const [users, setUsers] = useState(api.users.fetchAll)

  const handleDelete = (id: string) => {
    setUsers(prev => prev.filter(user => user._id !== id))
  }

  const handleToggleBookmark = (userId: string) => {
    const uploadUsers = users.map(user => {
      if (user._id === userId) user.bookmark = !user.bookmark
      return user
    })
    setUsers(uploadUsers)
  }


  return (
    <UserContext.Provider value={{ users, onToggleBookmark: handleToggleBookmark, onDelete: handleDelete }}>
      <SearchStatus/>
      <Users/>
    </UserContext.Provider>
  )
}

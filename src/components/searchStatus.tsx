import React, { FC } from "react"
import { useUserContext } from "../context/userContext"

export const SearchStatus: FC = () => {
  const { users } = useUserContext()
  return (
    <h2>
      {
        users.length === 0
          ?
          <span className="badge bg-danger">Никто с тобой не тусанет</span>
          :
          <span className="badge bg-primary">
            {users.length} человек {users.length > 1 && users.length < 5 ? 'тусанут' : 'тусанет'} с тобой сегодня
          </span>
      }
    </h2>
  )
}

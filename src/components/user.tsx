import React, { FC } from "react"
import { IUser } from "../types"
import { Quality } from "./quality"
import { Bookmark } from "./bookmark"
import { useUserContext } from "../context/userContext"


export const User: FC<{ user: IUser }> = ({ user }) => {
  const { onDelete } = useUserContext()
  return (
    <tr>
      <td>{user.name}</td>
      <Quality qualities={user.qualities}/>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <Bookmark user={user}/>
      <td>{user.rate} / 5</td>
      <td>
        <button className="btn btn-danger btn-sm m-2" onClick={() => onDelete(user._id)}>delete</button>
      </td>
    </tr>
  )
}

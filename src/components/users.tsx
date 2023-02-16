import { FC } from "react"
import { User } from "./user"
import { useUserContext } from "../context/userContext"


export const Users: FC = () => {
  const { users } = useUserContext()
  return (
    <table className="table container" hidden={users.length === 0}>
      <thead>
      <tr>
        <th scope="col">Имя</th>
        <th scope="col">Качества</th>
        <th scope="col">Профессия</th>
        <th scope="col">Встретился, раз</th>
        <th scope="col">Оценка</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      {users.map(user => (<User key={user._id} user={user}/>))}
      </tbody>
    </table>
  )
}

import React, { useState } from "react"
import api from '../api'


export const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll)

  const renderPhrase = (badges: { _id: string, name: string, color: string }[]) => {
    return badges.map(badge => (
      <span key={badge._id} className={`badge bg-${badge.color} mx-1`}>{badge.name}</span>
    ))
  }

  const handleDelete = (id: string) => {
    setUsers(prev => prev.filter(user => user._id !== id))
  }

  if (users.length === 0) {
    return <h2><span className="badge bg-danger">Никто с тобой не тусанет</span></h2>
  }

  return (
    <>
      <h2>
        <span className="badge bg-primary">
        {users.length} человек {users.length > 1 && users.length < 5 ? 'тусанут' : 'тусанет'} с тобой сегодня
      </span>
      </h2>
      <table className="table container">
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
        {users.map(user => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{renderPhrase(user.qualities)}</td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate} / 5</td>
            <td>
              <button className="btn btn-danger btn-sm m-2" onClick={() => handleDelete(user._id)}>delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  )
}

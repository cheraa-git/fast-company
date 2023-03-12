import React, { FC } from 'react'
import { Columns, IUser, Sort } from '../../types'
import { Bookmark } from './bookmark'
import { QualitiesList } from './qualitiesList'
import { useUserContext } from '../context/userContext'
import { Table } from './table'

interface UsersTableProps {
  users: IUser[]
  onSort: (sort: Sort) => void
  selectedSort: Sort
}

export const UsersTable: FC<UsersTableProps> = ({ users, onSort, selectedSort }): JSX.Element => {
  const { onDelete } = useUserContext()

  const columns: Columns<IUser> = {
    name: { path: 'name', name: 'Имя' },
    qualities: { name: 'Качество', component: (user) => <QualitiesList qualities={user.qualities} /> },
    professions: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: { path: 'bookmark', name: 'Избранное', component: user => <Bookmark user={user} /> },
    delete: {
      component: (user) => (
        <button className="btn btn-danger btn-sm m-2" onClick={() => onDelete(user._id)}>delete</button>)
    }
  }

  return (
    <Table data={users} columns={columns} onSort={onSort} selectedSort={selectedSort} />
  )
}

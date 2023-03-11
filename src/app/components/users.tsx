import React, { FC, useEffect, useState } from 'react'
import { User } from './user'
import { useUserContext } from '../context/userContext'
import { Pagination } from './pagination'
import { paginate } from '../utils/paginate'
import api from '../api'
import { GroupList } from './groupList'
import { IProfession, IProfessions } from '../../types'
import { SearchStatus } from './searchStatus'

export const Users: FC = (): JSX.Element => {
  const { users } = useUserContext()
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState<IProfessions>()
  const [selectedProf, setSelectedProf] = useState<IProfession>()
  const pageSize = 4

  useEffect(() => {
    void api.professions.fetchAll().then((professions) => setProfessions(professions))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex)
  }

  const handleProfessionSelect = (item: IProfession) => {
    setSelectedProf(item)
  }

  const clearFilter = () => {
    setSelectedProf(undefined)
  }

  const filteredUsers = selectedProf
    ? users.filter((user) => user.profession._id === selectedProf._id)
    : users
  const count = filteredUsers.length
  const userCrop = paginate(filteredUsers, currentPage, pageSize)
  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList<IProfession>
            items={professions}
            selectedItem={selectedProf}
            onItemSelect={handleProfessionSelect}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>
            Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <SearchStatus users={filteredUsers} />
        {users.length > 0 && (
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
            {userCrop.map((user) => (
              <User key={user._id} user={user} />
            ))}
            </tbody>
          </table>
        )}
        <div className="d-flex justify-content-center">
          <Pagination itemsCount={count} pageSize={pageSize} onPageChange={handlePageChange}
                      currentPage={currentPage} />
        </div>
      </div>

    </div>
  )
}

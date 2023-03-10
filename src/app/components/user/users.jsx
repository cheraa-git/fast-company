import { useEffect, useState } from 'react'
import { Pagination } from '../pagination'
import { paginate } from '../../utils/paginate'
import api from '../../api'
import { GroupList } from '../groupList'
import { SearchStatus } from '../searchStatus'
import { UsersTable } from './usersTable'
import { UserContext } from '../../context/userContext'
import _ from 'lodash'
import { Spinner } from '../Spinner'

export const Users = () => {
  const [users, setUsers] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const pageSize = 8

  useEffect(() => {
    api.users.fetchAll().then(response => setUsers(response))
    api.professions.fetchAll().then((professions) => setProfessions(professions))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const handleDelete = (id) => {
    setUsers((prev) => prev?.filter((user) => user._id !== id))
  }

  const handleToggleBookmark = (userId) => {
    const uploadUsers = users?.map((user) => {
      if (user._id === userId) user.bookmark = !user.bookmark
      return user
    })
    setUsers(uploadUsers)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
  }

  const clearFilter = () => {
    setSelectedProf(undefined)
  }

  if (!users) return <Spinner />

  const filteredUsers = selectedProf ? users.filter((user) => user.profession._id === selectedProf._id) : users
  const count = filteredUsers.length
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
  const userCrop = paginate(sortedUsers, currentPage, pageSize)

  return (
    <UserContext.Provider value={{ users, onToggleBookmark: handleToggleBookmark, onDelete: handleDelete }}>
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              items={professions}
              selectedItem={selectedProf}
              onItemSelect={handleProfessionSelect}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              ????????????????
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus users={filteredUsers} />
          {users.length > 0 && <UsersTable users={userCrop} selectedSort={sortBy} onSort={setSortBy} />}
          <div className="d-flex justify-content-center">
            <Pagination itemsCount={count} pageSize={pageSize} onPageChange={handlePageChange}
                        currentPage={currentPage} />
          </div>
        </div>

      </div>
    </UserContext.Provider>
  )
}

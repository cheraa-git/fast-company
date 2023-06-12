import { useEffect, useState } from 'react'
import { Pagination } from '../../common/pagination'
import { paginate } from '../../../utils/paginate'
import { GroupList } from '../../common/groupList'
import { SearchStatus } from '../../ui/searchStatus'
import { UsersTable } from '../../ui/usersTable'
import _ from 'lodash'
import { Spinner } from '../../ui/spinner'
import { useUser } from '../../../hooks/useUsers'
import { useAuth } from '../../../hooks/useAuth'
import { useSelector } from 'react-redux'
import { getProfessions, getProfessionsLoading } from '../../../store/professions'

export const UsersListPage = () => {
  const { users } = useUser()
  const { currentUser } = useAuth()
  const professions = useSelector(getProfessions())
  const professionsLoading = useSelector(getProfessionsLoading())
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [searchValue, setSearchValue] = useState('')
  const pageSize = 8


  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])


  const handleToggleBookmark = (userId) => {
    const uploadUsers = users?.map((user) => {
      if (user._id === userId) user.bookmark = !user.bookmark
      return user
    })
    console.log(uploadUsers)
    // setUsers(uploadUsers)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
    setSearchValue('')
  }

  const clearFilter = () => {
    setSelectedProf(undefined)
  }

  const handleSearch = (event) => {
    setSearchValue(event.target.value)
    clearFilter()
  }

  const getFilteredUsers = (data) => {
    data = [...data].filter(u => u._id !== currentUser._id)
    if (selectedProf) {
      return data.filter(user => user.profession === selectedProf._id)
    }
    if (searchValue) {
      return data.filter(user => user.name.toLowerCase().includes(searchValue.toLowerCase()))
    }
    return data
  }

  if (!users) return <Spinner />

  const filteredUsers = getFilteredUsers(users)
  const count = filteredUsers.length
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
  const userCrop = paginate(sortedUsers, currentPage, pageSize)

  return (
    <div className="d-flex">
      {professions && !professionsLoading && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
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
        <input
          className="form-control"
          type="text"
          value={searchValue}
          onChange={handleSearch}
          placeholder="Search..."
        />
        {users.length > 0 &&
          <UsersTable
            users={userCrop}
            selectedSort={sortBy}
            onSort={setSortBy}
            onToggleBookmark={handleToggleBookmark}
          />
        }
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  )
}

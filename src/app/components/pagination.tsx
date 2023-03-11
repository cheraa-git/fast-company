import { FC } from 'react'
import _ from 'lodash'

interface PaginationProps {
  itemsCount: number
  pageSize: number
  onPageChange: (pageIndex: number) => void
  currentPage: number
}

export const Pagination: FC<PaginationProps> = ({ itemsCount, pageSize, onPageChange, currentPage }): JSX.Element => {
  const pageCont = Math.ceil(itemsCount / pageSize)
  if (pageCont === 1) return <></>
  const pages = _.range(1, pageCont + 1)

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

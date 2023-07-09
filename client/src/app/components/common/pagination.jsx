import _ from 'lodash'
import PropTypes from 'prop-types'


export const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pageCont = Math.ceil(itemsCount / pageSize)
  const pages = _.range(1, pageCont + 1)

  if (pageCont === 1) return <></>
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

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}


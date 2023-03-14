import _ from 'lodash'
import PropTypes from 'prop-types'


const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
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

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}

export { Pagination }

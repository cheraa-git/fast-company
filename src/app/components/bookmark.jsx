import PropTypes from 'prop-types'


const Bookmark = ({ user, onToggleBookmark }) => {
  return (
    <button
      onClick={() => {
        onToggleBookmark(user._id)
      }}
      className={`p-1 bi bi-bookmark${user.bookmark ? '-heart-fill' : ''}`}
    />
  )
}

Bookmark.propTypes = {
  user: PropTypes.object.isRequired,
  onToggleBookmark: PropTypes.func.isRequired
}

export { Bookmark }

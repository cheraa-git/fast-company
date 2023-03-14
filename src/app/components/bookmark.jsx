import { useUserContext } from '../context/userContext'
import PropTypes from 'prop-types'


const Bookmark = ({ user }) => {
  const { onToggleBookmark } = useUserContext()
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
  user: PropTypes.object.isRequired
}

export { Bookmark }

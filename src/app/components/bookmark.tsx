import { FC } from 'react'
import { IUser } from '../../types'
import { useUserContext } from '../context/userContext'

interface BookmarkProps {
  user: IUser
}

export const Bookmark: FC<BookmarkProps> = ({ user }): JSX.Element => {
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

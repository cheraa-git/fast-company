import { useParams } from 'react-router-dom'
import { Spinner } from '../../ui/spinner'
import { UserCard } from '../../ui/user/userCard'
import Comments from '../../ui/comments'
import { QualitiesCard } from '../../ui/user/qualitiesCard'
import { MeetingsCard } from '../../ui/user/meetingsCard'
import { CommentsProvider } from '../../../hooks/useComments'
import { useAuth } from '../../../hooks/useAuth'
import { useSelector } from 'react-redux'
import { getUserById } from '../../../store/users'

export const UserPage = () => {
  const { userId } = useParams()
  const { currentUser } = useAuth()
  const user = userId === currentUser._id ? currentUser : useSelector(getUserById(userId))


  if (!user) return <Spinner />
  return (
    <div className="container">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <UserCard user={user} />
          <QualitiesCard qualities={user.qualities} />
          <MeetingsCard completedMeetings={user.completedMeetings} />
        </div>
        <div className="col-md-8">
          <CommentsProvider>
            <Comments />
          </CommentsProvider>
        </div>
      </div>
    </div>
  )
}

import { useParams } from 'react-router-dom'
import { Spinner } from '../../ui/Spinner'
import { UserCard } from '../../ui/user/userCard'
import Comments from '../../ui/comments'
import { QualitiesCard } from '../../ui/user/qualitiesCard'
import { MeetingsCard } from '../../ui/user/meetingsCard'
import { useUser } from '../../../hooks/useUsers'
import { CommentsProvider } from '../../../hooks/useComments'

export const UserPage = () => {
  const { userId } = useParams()
  const { getUserById } = useUser()
  const user = getUserById(userId)


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

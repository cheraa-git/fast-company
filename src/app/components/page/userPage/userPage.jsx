import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../api'
import { Spinner } from '../../ui/Spinner'
import { UserCard } from '../../ui/userCard'
import Comments from '../../ui/comments'
import QualitiesList from '../../ui/qualities'

const UserPage = () => {
  const { userId } = useParams()
  const [user, setUser] = useState()

  useEffect(() => {
    api.users.getById(userId).then(response => setUser(response))
  }, [])

  if (!user) return <Spinner />
  return (
    <div className="container">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <UserCard user={user} />
          <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
              <h5 className="card-title">
                <span>Qualities</span>
              </h5>
              <div>
                <QualitiesList qualities={user.qualities} />
              </div>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
              <h5 className="card-title">
                <span>Completed meetings</span>
              </h5>
              <h1 className="display-1">{user.completedMeetings}</h1>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <Comments userId={userId} />
        </div>
      </div>
    </div>
  )
}

export { UserPage }

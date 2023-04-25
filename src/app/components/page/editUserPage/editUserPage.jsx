import { EditUserForm } from '../../ui/forms/editUserForm'
import { useEffect, useState } from 'react'
import { Spinner } from '../../ui/Spinner'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import query from '../../../utils/query'

export const EditUserPage = ({ userId }) => {
  const history = useHistory()
  const [user, setUser] = useState()
  const [professions, setProfessions] = useState()
  const [qualities, setQualities] = useState()

  useEffect(() => {
    query.getProfessionOptions().then(professions => setProfessions(professions))
    query.getQualityOptions().then(qualities => setQualities(qualities))
    query.getUser(userId).then(user => setUser(user))
  }, [])

  if (!user || !professions || !qualities) return <Spinner />
  return (
    <div className="container mt-5">
      <button className="btn btn-primary" onClick={() => history.push(`/users/${userId}`)}>
        <i className="bi bi-caret-left" />
        Назад
      </button>
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <EditUserForm user={user} professions={professions} qualities={qualities} />
        </div>
      </div>
    </div>
  )
}

EditUserPage.propTypes = {
  userId: PropTypes.string
}

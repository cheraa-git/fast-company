import { EditUserForm } from '../../ui/forms/editUserForm'
import { useEffect, useState } from 'react'
import { Spinner } from '../../ui/Spinner'
import PropTypes from 'prop-types'
import { getProfessionsQuery, getQualitiesQuery, getUserByIdQuery } from '../../../utils/apiQueries'
import { useHistory } from 'react-router-dom'

export const EditUserPage = ({ userId }) => {
  const history = useHistory()
  const [user, setUser] = useState()
  const [professions, setProfessions] = useState()
  const [qualities, setQualities] = useState()

  useEffect(() => {
    getProfessionsQuery().then(professions => setProfessions(professions))
    getQualitiesQuery().then(qualities => setQualities(qualities))
    getUserByIdQuery(userId).then(user => setUser(user))
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

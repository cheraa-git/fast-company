import { EditUserForm } from '../../ui/forms/editUserForm'
import { useEffect, useState } from 'react'
import { Spinner } from '../../ui/Spinner'
import PropTypes from 'prop-types'
import { getProfessionsQuery, getQualitiesQuery, getUserByIdQuery } from '../../../utils/apiQueries'

export const EditUserPage = ({ userId }) => {
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

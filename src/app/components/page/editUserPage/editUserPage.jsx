import { EditUserForm } from '../../ui/forms/editUserForm'
import { Spinner } from '../../ui/spinner'
import { useHistory, useParams } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getQualities, getQualitiesLoadingStatus } from '../../../store/qualities'
import { getProfessions, getProfessionsLoading } from '../../../store/professions'

export const EditUserPage = () => {
  const history = useHistory()
  const { userId } = useParams()
  const { currentUser, updateUser } = useAuth()
  const professions = useSelector(getProfessions())
  const professionsLoading = useSelector(getProfessionsLoading())
  const qualities = useSelector(getQualities())
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus())
  const qualitiesList = qualities.map(q => ({ label: q.name, value: q._id }))
  const professionsList = professions.map(p => ({ label: p.name, value: p._id }))
  const user = {
    ...currentUser,
    qualities: currentUser.qualities.map(qId => qualitiesList.find(qOption => qOption.value === qId))
  }

  useEffect(() => {
    if (userId !== currentUser._id) history.push(`/users/${currentUser._id}/edit`)
  }, [userId])

  const handleSubmit = async (data) => {
    await updateUser({ ...data, qualities: data.qualities.map(q => q.value) })
    history.push(`/users/${userId}`)
  }


  if (professionsLoading || qualitiesLoading) return <Spinner />
  return (
    <div className="container mt-5">
      <button className="btn btn-primary" onClick={() => history.push(`/users/${userId}`)}>
        <i className="bi bi-caret-left" />
        Назад
      </button>
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <EditUserForm user={user} professions={professionsList} qualities={qualitiesList} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  )
}

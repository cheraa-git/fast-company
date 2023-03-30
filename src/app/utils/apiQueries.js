import api from '../api'

export const getUserByIdQuery = async (userId) => {
  const user = await api.users.getById(userId)
  return {
    ...user,
    qualities: user.qualities.map(quality => ({ label: quality.name, value: quality._id, color: quality.color }))
  }
}

export const getQualitiesQuery = async () => {
  const qualities = await api.qualities.fetchAll()
  return Object.values(qualities).map(quality => ({
    value: quality._id,
    label: quality.name,
    color: quality.color
  }))
}

export const getProfessionsQuery = async () => {
  const professions = await api.professions.fetchAll()
  return Object.values(professions).map(profession => ({
    value: profession._id,
    label: profession.name
  }))
}

export const updateUserQuery = async (userId, data) => {
  const sendData = {
    ...data,
    qualities: data.qualities.map(quality => ({
      _id: quality.value, name: quality.label, color: quality.color
    }))
  }
  return await api.users.update(userId, sendData)
}

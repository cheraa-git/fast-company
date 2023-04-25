import api from '../api'
import _ from 'lodash'

const getUser = async (userId) => {
  const user = await api.users.getById(userId)
  return {
    ...user,
    qualities: user.qualities.map(quality => ({ label: quality.name, value: quality._id, color: quality.color }))
  }
}

export const getUsersOptions = async () => {
  const users = await api.users.fetchAll()
  return users.map(user => ({ value: user._id, label: user.name }))
}


const getQualityOptions = async () => {
  const qualities = await api.qualities.fetchAll()
  return Object.values(qualities).map(quality => ({
    value: quality._id,
    label: quality.name,
    color: quality.color
  }))
}

const getProfessionOptions = async () => {
  const professions = await api.professions.fetchAll()
  return Object.values(professions).map(profession => ({
    value: profession._id,
    label: profession.name
  }))
}

const updateUser = async (userId, data) => {
  const sendData = {
    ...data,
    qualities: data.qualities.map(quality => ({
      _id: quality.value, name: quality.label, color: quality.color
    }))
  }
  return await api.users.update(userId, sendData)
}

const getComments = async (userId) => {
  const comments = await api.comments.fetchCommentsForUser(userId)
  return _.orderBy(comments, ['created_at'], ['desc'])
}

export default {
  getComments,
  getProfessionOptions,
  getQualityOptions,
  getUser,
  updateUser,
  getUsersOptions
}

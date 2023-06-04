import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'
import localStorageService from './localStorage.service'
import { httpAuth } from '../hooks/useAuth'

const http = axios.create({
  baseURL: configFile.API_ENDPOINT
})

http.interceptors.request.use(async (config) => {
  if (configFile.isFirebase) {
    config.url = config.url.replace(/\/$/g, '') + '.json'
    const expiresDate = localStorageService.getTokenExpiresDate()
    const refreshToken = localStorageService.getRefreshToken()
    if (refreshToken && expiresDate < Date.now()) {
      const { data } = await httpAuth.post('token', { grant_type: 'refresh_token', refresh_token: refreshToken })
      localStorageService.setTokens({
        refreshToken: data.refresh_token,
        localId: data.user_id,
        expiresIn: data.expires_in,
        idToken: data.id_token
      })
    }
    const accessToken = localStorageService.getAccessToken()
    if (accessToken) {
      config.params = { ...config.params, auth: accessToken }
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

const transformData = (data) => {
  if (!data) return []
  if (data._id) return data
  return Object.values(data)
}

http.interceptors.response.use(res => {
  if (configFile.isFirebase) {
    res.data = { content: transformData(res.data) }
  }
  return res
}, error => {
  const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500
  if (!expectedErrors) {
    console.log(error)
    toast.error('Something went wrong. Try again later')
  }
  return Promise.reject(error)
})

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete
}

export default httpService

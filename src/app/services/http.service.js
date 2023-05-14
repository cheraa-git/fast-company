import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'

const http = axios.create({
  baseURL: configFile.API_ENDPOINT
})

http.interceptors.request.use(config => {
  if (configFile.isFirebase) {
    config.url = config.url.replace(/\/$/g, '') + '.json'
  }
  return config
}, error => {
  return Promise.reject(error)
})

const transformData = (data) => {
  return data ? Object.values(data) : []
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

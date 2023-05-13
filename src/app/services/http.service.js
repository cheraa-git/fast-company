import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'

const request = axios.create({
  baseURL: configFile.API_ENDPOINT
})

request.interceptors.request.use(config => {
  if (configFile.isFirebase) {
    config.url = config.url.replace(/\/$/g, '') + '.json'
  }
  console.log(config.url)
  return config
}, error => {
  return Promise.reject(error)
})

const transformData = (data) => {
  return data ? Object.values(data) : []
}

request.interceptors.response.use(res => {
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
  get: request.get,
  post: request.post,
  put: request.put,
  delete: request.delete
}

export default httpService

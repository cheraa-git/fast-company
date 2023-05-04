import axios from 'axios'
import { toast } from 'react-toastify'
import config from '../config.json'

const request = axios.create({
  baseURL: config.API_ENDPOINT
})

request.interceptors.response.use(res => res, error => {
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

import axios from 'axios'
const baseUrl = '/api/blog'

let token = null
let config

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  console.log(config)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async updateObject => {
  const response = await axios.put(`${ baseUrl }/${updateObject.id}`, updateObject, config)
  return response.data
}

const remove = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, update, remove, setToken }
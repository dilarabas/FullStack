import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

// Yeni: Blog güncelleme (beğeniler için)
const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token }, // Güncelleme işlemi de yetkilendirme gerektirebilir
  }
  const response = await axios.put(`<span class="math-inline">\{baseUrl\}/</span>{id}`, newObject, config)
  return response.data
}

// Yeni: Blog silme (5.11 için)
const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`<span class="math-inline">\{baseUrl\}/</span>{id}`, config)
  return response.data
}


export default { getAll, setToken, create, update, remove }
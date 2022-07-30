import axios from 'axios'
const baseUrl = '/api/users'

const create = async (userObject) => {
    const request = axios.post(baseUrl, userObject)
    return request.then(response => response.data)
}

export default { create }
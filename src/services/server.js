import axios from "axios";
const baseUrl = '/api/servers'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const config = {
        headers: { Authorization: token }
    }

    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const update = async (id, serverObject) => {
    const config = {
        headers: { Authorization: token }
    }

    const response = axios.put(`${baseUrl}/${id}`, serverObject, config)
    return response.data
}

export default { getAll, update, setToken }
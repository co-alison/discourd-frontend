import axios from 'axios'
const baseUrl = '/api/confirm'

const verifyUser = (code) => {
    console.log('request made')
    const request = axios.get(`${baseUrl}/${code}`)
    return request.then(response => response.data)
}

export default { verifyUser }
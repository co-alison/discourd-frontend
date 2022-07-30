import axios from 'axios'
const baseUrl = '/api/email'

const sendEmail = async (email) => {
    const response = await axios.post(baseUrl, email)
    return response.data
}

export default { sendEmail }
import { useState } from "react"
import emailService from "../services/email"

const Contact = ({ setNotification, setError }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        const contactEmail = {
            to: 'ubcdiscourd@gmail.com',
            subject: `Message from ${name} (${email})`,
            text: message
        }
        
        try {
            await emailService.sendEmail(contactEmail)
            setName('')
            setEmail('')
            setMessage('')
            setNotification('Message received.')
            setError(false)
            setTimeout(() => {
                setNotification(null)
            }, 3000)
        } catch (error) {
            console.log(error)
            setNotification('Something went wrong. Try again later or contact ubcdiscourd@gmail.com')
            setError(true)
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    }
    return (
        <div>
            <h1>Contact Us</h1>
            <span>Don't hold anything back.</span>
            <form onSubmit={handleSubmit}>
                Name:
                <input
                    type="text"
                    id="name"
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                Email:
                <input
                    type="text"
                    id="name"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                Message:
                <input
                    type="text"
                    id="name"
                    autoComplete="off"
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    disabled={!name || !email || !message ? true : false}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Contact
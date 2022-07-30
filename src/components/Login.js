import { useState, useEffect } from "react"
import loginService from "../services/login"
import { Link, Navigate } from "react-router-dom"

const Login = ({ user, setUser, setMessage, setError }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        setMessage(null)
    }, [email, password])

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const newUser = await loginService.login({
                email, password
            })

            window.localStorage.setItem('loggedDiscourdUser', JSON.stringify(newUser))
            setUser(newUser)

            setEmail('')
            setPassword('')
            console.log('Successfully logged in')
            setMessage('Successfully logged in')
            setError(false)
            setTimeout(() => {
                setMessage(null)
            }, 3000)

        } catch (error) {
            if (!error?.response) {
                setMessage('No server response')
                setError(true)
            } else if (error.response?.status === 401) {
                setMessage('Invalid username or password')
                setError(true)
            } else {
                setMessage('Login failed')
                setError(true)
            }
        }
    }
    return (
        <div>
            {user && (
                <Navigate to="/" replace="true" />
            )}
            <form onSubmit={handleSubmit}>
                * Email: 
                <input
                    type="text"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <br />
                Password: 
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/signup"><u>Sign Up</u></Link>
            </p>
            <p>
                * Must use a valid UBC email
            </p>
        </div>
    )
}

export default Login
import { useState } from "react"
import loginService from "../services/login"
import { Link, Navigate } from "react-router-dom"

const Login = ({ user, setUser }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
        } catch (error) {
            console.log(error)
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
import { useState, useEffect } from "react"
import loginService from "../services/login"
import { Navigate, NavLink, useNavigate } from "react-router-dom"

const Login = ({ user, setUser, setMessage, setError }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let navigate = useNavigate()

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

            navigate('/servers')

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
        <section className="login-section">
            {/* {user && (
                <Navigate to="/servers" replace="true" />
            )} */}
            <form onSubmit={handleSubmit} className="login-form">
                <div className="input-group">
                    <label>Email:</label>
                    <input
                        type="text"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </div>
                <div className="input-group">
                    <button type="submit" className="signup-btn">Login</button>
                </div>
                <div className="login-form-text">
                    <p className="login-text">
                    Don't have an account? <NavLink to="/signup" className="signup-link">Sign Up</NavLink>
                    </p>
                    <p className="valid-email-text">
                    * Must use a valid UBC email
                    </p>
                </div>
            </form>
        </section>
    )
}

export default Login
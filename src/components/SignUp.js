import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import signupService from '../services/signup'

const SignUp = ({ user, setUser, setMessage, setError }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        const newUser = {
            name,
            email,
            password
        }

        try {
            const createdUser = await signupService.create(newUser)
            setUser(createdUser)
            setMessage('Account successfully created')
            setError(false)
            setTimeout(() => {
                setMessage(null)
            }, 3000)
        } catch (error) {
            console.log(error)
            if (error.response.status === 409) {
                setMessage('This email has already been used')
                setError(true)
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            } else if (error.response.status === 406) {
                setMessage('Invalid UBC email')
                setError(true)
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            } else {
                setMessage('Something went wrong')
                setError(true)
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            }
        }
    }

    return (
        <div>
            {user && (
                <Navigate to='/login' replace={true} />
            )}
            <h1>Sign up for free</h1>
            <span>Explore our database of UBC servers or add your own server</span>
            <form onSubmit={handleSubmit}>
                Name:
                <input
                    type="text"
                    id="name"
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                />
                <br />
                * Email:
                <input
                    type="text"
                    id="email"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                Password:
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
            <p>
                    Already have an account? <Link to="/login"><u>Login</u></Link>
                </p>
                <p>
                    * Must use a valid UBC email
                </p>
        </div>
    )
}

export default SignUp
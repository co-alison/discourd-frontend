import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import signupService from '../services/signup'

const SignUp = ({ user, setUser }) => {
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
        } catch (error) {
            console.log(error)
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
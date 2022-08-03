import { Link, NavLink } from 'react-router-dom'
import logo from '../images/logo.png'

const NavBar = ({ user, setUser, setMessage, setError }) => {
    
    const handleLogout = () => {
        window.localStorage.removeItem('loggedDiscourdUser')

        setUser(null)
        console.log('user logged out')
        setMessage('Successfully logged out')
        setError(false)
        setTimeout(() => {
            setMessage(null)
        }, 3000)
    }

    return (
        <header>
            {
                user ?
                (
                    <div className='header'>
                        <Link to="/" className="brand-logo">
                            <img src={logo} alt="Discourd logo" />
                            <div className="brand-logo-name">Discourd</div>
                        </Link>
                        <div className='nav'>
                            <Link to="/servers" className='nav-link'>Servers</Link>
                            <Link to="/" onClick={handleLogout} className='nav-link'>Logout</Link>
                        </div>
                    </div>
                ) : (
                    <div className='header'>
                        <Link to="/" className="brand-logo">
                            <img src={logo} alt="Discourd logo" />
                            <div className="brand-logo-name">Discourd</div>
                        </Link>
                        <div className='nav'>
                            <NavLink to="/login" className="nav-link">Login</NavLink>
                            <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
                        </div>
                    </div>
                )
            }
        </header>
    )
}

export default NavBar
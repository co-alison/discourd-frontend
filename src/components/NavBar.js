import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'

const NavBar = ({ user, setUser }) => {

    let navigate = useNavigate()
    
    const handleLogout = () => {
        window.localStorage.removeItem('loggedDiscourdUser')

        setUser(null)
        console.log('user logged out')
        navigate('/', { replace: true })
    }

    return (
        <header>
            {
                user ?
                (
                    <div>
                        <Link to="/" className="brand-logo">
                            <img src={logo} alt="Discourd logo" />
                            <div className="brand-logo-name">Discourd</div>
                        </Link>
                        <Link to="/servers">Servers</Link>
                        <Link to="/logout" onClick={handleLogout}>Logout</Link>
                    </div>
                ) : (
                    <div className='no-user-header'>
                        <Link to="/" className="brand-logo">
                            <img src={logo} alt="Discourd logo" />
                            <div className="brand-logo-name">Discourd</div>
                        </Link>
                        <div className='no-user-nav'>
                            <NavLink to="/login" className="no-user-nav-link">Login</NavLink>
                            <NavLink to="/signup" className="no-user-nav-link">Sign Up</NavLink>
                        </div>
                    </div>
                )
            }
        </header>
    )
}

export default NavBar
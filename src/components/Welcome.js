import { Link, matchRoutes, useLocation } from 'react-router-dom'
import verifyService from '../services/verify'

const Welcome = (props) => {

    const routes = [{ path: '/confirm/:confirmationCode' }]

    let code = ''

    const useCurrentPath = () => {
        const location = useLocation()
        const [{ route }] = matchRoutes(routes, location)
        code = location.pathname.split('/').pop()
        return route.path
    }

    const currentPath = useCurrentPath()
    if (currentPath === '/confirm/:confirmationCode' && code) {
        verifyService.verifyUser(code)
        console.log('verified')
    } else {
        console.log('error')
        return
    }

    return (
        <div>
            <h3>
                <strong>Account confirmed!</strong>
            </h3>
            <Link to={"/login"}>Login</Link>
        </div>
    )
}

export default Welcome
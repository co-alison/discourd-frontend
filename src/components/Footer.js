import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About</Link>
            <span>Icons by <a href="https://icons8.com/">icons8.com</a></span>
        </div>
    )
}

export default Footer
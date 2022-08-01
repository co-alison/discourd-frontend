import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer>
            <div className="footer">
                    <Link to="/contact" className="nav-link">Contact</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    <span style={{color: "#adadad"}}>Made by Alison Co</span>
            </div>
        </footer>
    )
}

export default Footer
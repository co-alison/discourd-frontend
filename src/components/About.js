import { useNavigate } from "react-router-dom"

const About = () => {
    let navigate = useNavigate()
    const handleContact = () => {
        const path = '/contact'
        navigate(path)
    }
    return (
        <div>
            <h1>About Us</h1>
            <span>Discourd is the centralized place for all UBC servers, making it easy to find exactly what you are looking for. With the ability to add your own server and expand our database, we put the community first. </span>
            <h2>Safety and Security</h2>
            <span>Each server has been carefully verified by our developers to ensure user safety. Our database is also strictly available to UBC students, and all users must sign up with a verified UBC email.</span>
            <h2>Questions or concerns?</h2>
            <span>We value all your feedback and will happily answer your questions.</span>
            <button onClick={handleContact}>Contact</button>
        </div>
    )
}

export default About
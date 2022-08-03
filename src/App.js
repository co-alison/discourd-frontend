import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import About from "./components/About";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Servers from "./components/Servers";
import Notification from "./components/Notification";
import Welcome from "./components/Welcome";
import serverService from "./services/server";

const App = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedDiscourdUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      serverService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <div className="container full-height-grow">
        <Notification message={message} isError={isError} />
        <NavBar user={user} setUser={setUser} setMessage={setMessage} setError={setError}/>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route
              path="/contact"
              element={
                <Contact setNotification={setMessage} setError={setError} />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/login"
              element={
                <Login
                  user={user}
                  setUser={setUser}
                  setMessage={setMessage}
                  setError={setError}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <SignUp
                  setUser={setUser}
                  setMessage={setMessage}
                  setError={setError}
                />
              }
            />
            <Route
              path="/servers"
              element={
                <Servers
                  user={user}
                  setUser={setUser}
                  setMessage={setMessage}
                  setError={setError}
                />
              }
            />
            <Route path="/confirm/:confirmationCode" element={<Welcome />} />
          </Routes>
        </div>
        <div className="push"></div>
      </div>
      <Footer /> 
    </div>
  );
};

export default App;

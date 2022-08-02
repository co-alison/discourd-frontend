import { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import signupService from "../services/signup";

const SignUp = ({ user, setUser, setMessage, setError }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUser = {
      name,
      email,
      password,
    };

    try {
      const createdUser = await signupService.create(newUser);
      setUser(createdUser);
      setMessage("Account successfully created");
      setError(false);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        setMessage("This email has already been used");
        setError(true);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      } else if (error.response.status === 406) {
        setMessage("Invalid UBC email");
        setError(true);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      } else {
        setMessage("Something went wrong");
        setError(true);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    }
  };

  return (
    <div>
      {user && <Navigate to="/login" replace={true} />}
      <section className="signup-section">
        <div className="signup-text">
          <h1 className="heading">Sign up for free</h1>
          <span className="subtext">
            Explore our database of UBC servers or add your own server
          </span>
        </div>
        <div className="main-signup-form">
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="input-group">
              <label>Name:</label>
              <input
                type="text"
                id="name"
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
            <div className="input-group">
              <label>* Email:</label>
              <input
                type="text"
                id="email"
                autoComplete="off"
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
              <button className="signup-btn" type="submit">
                Sign Up
              </button>
            </div>
            <div className="signup-form-text">
              <p className="login-text">
                Already have an account?{" "}
                <NavLink to="/login" className="login-link">
                  Login
                </NavLink>
              </p>
              <p className="valid-email-text">* Must use a valid UBC email</p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignUp;

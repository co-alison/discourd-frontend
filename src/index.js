import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'
import './Home.css'
import './SignUp.css'
import './Login.css'
import './Servers.css'
import './Notification.css'
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);


import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Alert from './components/Alert'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import PrivateRoute from './components/PrivateRoute'

import AlertState from './context/alert/AlertState'
import AuthState from './context/auth/AuthState'
import ContactState from './context/contact/ContactState'
import setAuthToken from './utils/setAuthToken'
import './App.css'

if(localStorage.token) {
  setAuthToken(localStorage.token)
}


function App() {
  return(
    <AuthState>
      <AlertState>
        <ContactState>
          <Router>
            <>
              <Navbar />
              <div className="container">
                <Alert />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
              </div>
            </>
          </Router>
        </ContactState>
      </AlertState>
    </AuthState>
  )
} 

export default App;

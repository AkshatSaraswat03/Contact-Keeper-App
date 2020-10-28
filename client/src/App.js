import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Alert from './components/Alert'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

import AlertState from './context/alert/AlertState'
import AuthState from './context/auth/AuthState'
import ContactState from './context/contact/ContactState'
import './App.css'

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
                <Route exact path="/" component={Home} />
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

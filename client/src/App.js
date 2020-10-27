import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/pages/Home'
import About from './components/pages/About'
import ContactState from './context/contact/ContactState'
import './App.css'

function App() {
  return(
    <ContactState>
      <Router>
        <>
          <Navbar />
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
          </div>
        </>
      </Router>
    </ContactState>
  )
} 

export default App;

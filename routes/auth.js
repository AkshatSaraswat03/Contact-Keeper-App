const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middlewares/auth')
const { check, validationResult } = require('express-validator')

const User = require('../models/User')

//this gets the logged in user
router.get('/', auth, async (req,res)=> {
  try {
    //getting user from database
    //using the req as the middleware gets the payload in the route
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)

  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
    
  }
})



//authenticating the user and get the token
router.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], 
async (req,res)=> {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const {email, password} = req.body

  try {
    let user = await User.findOne({email})

    if(!user){
      return res.status(400).json({msg: "Invalid credentials"})
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match){
      res.status(400).json({msg: "invalid password"})
    }

    //this means that the user exists. correect login
    
    const payload = {
      user: {
        id: user.id
      }
    }
    //generating a token
     jwt.sign(payload, config.get('jwtSecret'), {
       expiresIn:360000
     }, (err, token) => {
       if(err) throw err
       res.json({ token })
     })


  } catch (err) {
    console.error(err.message)
    res.status(500).send("server error")
  }


})


module.exports = router
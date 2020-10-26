const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')

const User = require('../models/User')

router.post('/', [
  check('name', 'Name is needed')
    .not().isEmpty(),
  check('email', 'Please enter email')
    .isEmail(),
  check('password', 'Please enter pass with 6 or more characters')
    .isLength({min: 6})
] ,
async (req,res)=> {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const {name, email, password} = req.body
  try {
    let user = await User.findOne({email})

    if(user){
      res.status(400).json({msg: "user already exists"})
    }

    //creating a new user if it dowsn't exist already
    user = new User({
      name,
      email,
      password
    })

    //hashing the password here before saving
    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(password, salt)

    //saving user in database
    await user.save()

    //confirming if user is saved
    res.send('user saved')

  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }

})

module.exports = router
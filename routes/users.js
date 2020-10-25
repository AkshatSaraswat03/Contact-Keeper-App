const express = require('express')
const router = express.Router()
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
(req,res)=> {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

    res.send("passed")
})

module.exports = router
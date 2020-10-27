const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const Contact = require('../models/Contact')
const auth = require('../middlewares/auth')

//get all contacts of user
router.get('/', auth, async (req,res)=> {

  try {
    const contacts = await Contact.find({user: req.user.id}).sort({ date: -1})
    res.json(contacts)

  } catch (err) {
    console.error(err.message)
    res.status(500).send("server error")
  }
})

//add a contact
router.post('/', [auth, [
  check('name', 'Name is required').not().isEmpty()
] ], 
async (req,res)=> {
  
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const {name, email, phone, type} = req.body

  try {
    const newContact = new Contact({
      name, 
      email,
      phone,
      type,
      user: req.user.id
    })

    const contact = await newContact.save()
    res.json(contact)

  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
    
  }

})


//edit a contact
router.put('/:id', auth, async (req,res)=> {
  
  const {name, email, phone, type} = req.body

  //update new details
  const updatedContact = {}

  if(name) updatedContact.name = name
  if(email) updatedContact.email = email
  if(phone) updatedContact.phone = phone
  if(type) updatedContact.type = type

  try {
    let contact = Contact.findById(req.params.id)

    if(!contact){
      return res.status(400).json({msg: "Contact does not exist"})
    }

    //making sure user owns contact
    if (contact.user.toString() !== req.user.id){
      return res.status(401).json({msg : "not authorized"})
    }

    //updating contact
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {$set: updatedContact},
      {new: true}
    )

    res.json(contact)

  } catch (err) {
    console.error(err.message)
    res.status(500).send("server Error")
  }

})


//deleting a contact

router.delete('/:id', auth, async (req,res)=> {

  try {
    const contact = await Contact.findById(req.params.id)
    if(!contact) return res.status(400).json({msg: "contact not found"})

    //making sure user owns contact
    if (contact.user.toString() !== req.user.id){
      return res.status(401).json({msg : "not authorized"})
    }

    await Contact.findByIdAndRemove(req.params.id)
    res.json({msg: "contact removed"})

  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

module.exports = router
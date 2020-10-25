const express = require('express')
const connectDB = require('./config/db')

const app = express()

//connection with db made
connectDB()

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

//middleware for post requests
app.use(express.json({extended: false}))


app.get('/', (req, res)=> {
  res.json({msg: 'contact app'})
})




const PORT = process.env.PORT || 6000

app.listen(PORT, ()=> {
  console.log(`server started on port ${PORT}`)
})
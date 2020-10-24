const express = require('express')

const app = express()
const PORT = process.env.PORT || 6000

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

app.get('/', (req, res)=> {
  res.json({msg: 'contact app'})
})






app.listen(PORT, ()=> {
  console.log(`server started on port ${PORT}`)
})
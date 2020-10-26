const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  //get token from header
  const token = req.header('x-auth-token')

  if(!token){
    res.status(401).json({msg: "no token, authorization denied"})
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    //after verifying, the payload gets into decoded var

    //we set it into the req, so that we get acces inside the route
    req.user = decoded.user
    next()
    
  } catch (err) {
    res.status(401).json({msg: "token is not valid"})
  }
}
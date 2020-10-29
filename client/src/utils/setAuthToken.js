//check to see if token is passed and accordingly set remove from global header

import axios from 'axios'

const setAuthToken = (token) => {
  if(token) {
    axios.defaults.headers.common['x-auth-token'] = token
  } else {
    delete axios.defaults.headers.common['x-auth-token']
  }
}


export default setAuthToken
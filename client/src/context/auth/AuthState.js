import React, {useReducer} from 'react'
import AuthContext from './authContext'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import AuthReducer from './authReducer'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types'


const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated:null,
    error: null,
    user: null
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState)

  //Load User  - checking what user is logged in
  const loadUser = async ()=> {
    //load token into global 
    if(localStorage.token) {
      setAuthToken(localStorage.token)
    }

    try {
      const res = await axios.get('/api/auth')

      dispatch({type:USER_LOADED, payload: res.data})
    } catch (err) {
      dispatch({type: AUTH_ERROR})
    }
  }


  //Register User 
  const register = async (formData) => {
    //creating application/json header fr post request
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/users', formData, config)
      dispatch({type: REGISTER_SUCCESS, payload: res.data})

      loadUser()

    } catch (err) {
      dispatch({type: REGISTER_FAIL, payload: err.response.data.msg})

    }
  }

  //Login User - log in the user

  //Logout

  //Clear Errors
  const clearErrors = () => dispatch({type: CLEAR_ERRORS})


  return (
  <AuthContext.Provider value={{
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    error:state.error,
    user: state.user,
    register,
    clearErrors,
    loadUser

  }}>
  {props.children}
  </AuthContext.Provider>
  )
}

export default AuthState
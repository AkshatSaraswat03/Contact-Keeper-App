import React, {useReducer} from 'react'
import axios from 'axios'
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
import {
  ADD_CONTACT,
  GET_CONTACTS,
  CLEAR_CONTACTS,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CONTACT_ERROR
} from '../types'

const ContactState = (props) => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null,
    error: null
  }

  const [state, dispatch] = useReducer(ContactReducer, initialState)

  // get Contacts - to get the contacts. getreq to backend
  const getContacts = async () => {

    try {
      const res = await axios.get('/api/contacts')

      dispatch({type: GET_CONTACTS, payload: res.data})
    } catch (err) {
      dispatch({type: CONTACT_ERROR, payload: err.response})
    }

    
  }




  //add contact
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/contacts', contact, config)

      dispatch({type: ADD_CONTACT, payload: res.data})
    } catch (err) {
      dispatch({type: CONTACT_ERROR, payload: err.response})
    }

    
  }

  //delete contact
  const deleteContact = id => {
    dispatch({type: DELETE_CONTACT, payload: id})
  }

  //clear Contacts
  const clearContacts = () => {
    dispatch({type:CLEAR_CONTACTS})
  }

  //set current contact
  const setCurrent = contact => {
    dispatch({type: SET_CURRENT, payload: contact})
  }

  //clear current contact
  const clearCurrent = () => {
    dispatch({type: CLEAR_CURRENT})
  }
  
  //update contact
  const updateContact = contact => {
    dispatch({type: UPDATE_CONTACT, payload: contact})
  }

  //filter contact
  const filterContacts = text => {
    dispatch({type:FILTER_CONTACT, payload: text})
  }

  //clear filters
  const clearFilter = () => {
    dispatch({type: CLEAR_FILTER})
  } 


  return (
  <ContactContext.Provider value={{
    contacts: state.contacts,
    current: state.current,
    filtered: state.filtered,
    error: state.error,
    addContact,
    deleteContact,
    setCurrent,
    clearCurrent,
    updateContact,
    filterContacts,
    clearFilter,
    getContacts,
    clearContacts
  }}>
    {props.children}
  </ContactContext.Provider>
  )
}

export default ContactState













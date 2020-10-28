import React, {useReducer} from 'react'
import { v4 as uuidv4 } from 'uuid'
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  UPDATE_CONTACT,
  FILTER_CONTACT
} from '../types'

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Jill Johnson',
        email: 'jill@gmail.com',
        phone: '111-111-1111',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Sara Watson',
        email: 'sara@gmail.com',
        phone: '123-111-8888',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Harry Blank',
        email: 'harry@gmail.com',
        phone: '999-111-3333',
        type: 'professional'
      }
    ],
    current: null
  }

  const [state, dispatch] = useReducer(ContactReducer, initialState)

  //add contact
  const addContact = contact => {
    //adding id because of mongoDB
    contact.id = uuidv4()
    dispatch({type: ADD_CONTACT, payload: contact})
  }

  //delete contact
  const deleteContact = id => {
    dispatch({type: DELETE_CONTACT, payload: id})
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

  //filter contacts

  //clear filters

  return (
  <ContactContext.Provider value={{
    contacts: state.contacts,
    current: state.current,
    addContact,
    deleteContact,
    setCurrent,
    clearCurrent,
    updateContact
  }}>
    {props.children}
  </ContactContext.Provider>
  )
}

export default ContactState













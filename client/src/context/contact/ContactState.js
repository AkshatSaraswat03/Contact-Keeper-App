import React, {useReducer} from 'react'
import uuid from 'uuid'
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
    ]
  }

  const [state, dispatch] = useReducer(ContactReducer, initialState)

  //add contact

  //delete contact

  //set current contact

  //clear current contact

  //update contact

  //filter contacts

  //clear filters

  return (
  <ContactContext.Provider value={{
    contacts: state.contacts
  }}>
    {props.children}
  </ContactContext.Provider>
  )
}

export default ContactState













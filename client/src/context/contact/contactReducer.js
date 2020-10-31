import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS
} from '../types'

export default (state, action) => {
  switch(action.type){
    case GET_CONTACTS:
      return{
        ...state,
        contacts: action.payload
      }
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts ]
      }
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact =>
          contact._id !==action.payload)
      }
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts:[],
        filtered:null,
        error:null,
        current: null
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      }
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact => contact.id ===
          action.payload.id ? action.payload : contact)
      }
    case FILTER_CONTACT:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const exp = new RegExp(`${action.payload}`, 'gi')
          return contact.name.match(exp) || contact.email.match(exp)
        })
      }
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      }
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
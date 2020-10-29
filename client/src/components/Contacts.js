import React, {useContext, useEffect} from 'react'
import ContactContext from '../context/contact/contactContext'
import ContactItem from './ContactItem'
const Contacts = () => {
  const contactContext = useContext(ContactContext)

  const {contacts, filtered, getContacts} = contactContext

  useEffect(()=> {
    getContacts()
    //eslint-disable-next-line
  },[])


  if(contacts!==null && contacts.length === 0) {
    return <h4>Please Add a Contact !</h4>
  }

  return (
    <>
      {filtered !== null ? 
        filtered.map(contact => <ContactItem key={contact._id} contact={contact} />) 
        :
        contacts.map(contact => <ContactItem key={contact._id} contact={contact}/>)
      } 
    </>
  )
}

export default Contacts

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchContacts } from '../redux/contacts/contacts-operations';

import Container from '../components/Container';
import ContactForm from '../components/ContactForm/ContactForm';
import Filter from '../components/Filter/Filter';
import ContactList from '../components/ContactList/ContactList';

export default function ContactsView() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container className="container">
      <h1 className="title">Phonebook</h1>
      <ContactForm />
      <p className="title statistics">Statistics</p>
      <Filter />
      <ContactList />
    </Container>
  );
}

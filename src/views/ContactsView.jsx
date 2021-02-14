import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchContacts } from '../redux/contacts/contacts-operations';

import Container from '../components/Container';
import ContactForm from '../components/ContactForm/ContactForm';
import Filter from '../components/Filter/Filter';
import ContactList from '../components/ContactList/ContactList';

const styles = {
  title: {
    textAlign: 'center',
  },
};

export default function ContactsView() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <h1 className="title" style={styles.title}>
        Phonebook
      </h1>
      <ContactForm />
      <h2 className="title statistics" style={styles.title}>
        Statistics
      </h2>
      <Filter />
      <ContactList />
    </Container>
  );
}

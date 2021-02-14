import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { operations, selectors } from 'redux/contacts';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import s from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(selectors.getContacts);

  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (name === '' && number === '') {
      alert('Заполните все поля контакта');
      return;
    }
    contacts.find(contact => name.toLowerCase() === contact.name.toLowerCase())
      ? alert(`${name} is already in contacts`)
      : dispatch(operations.addContact({ name, number }));
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form action="" onSubmit={handleSubmit} className={s.form}>
      <Form.Group controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Enter name"
        />
      </Form.Group>
      <Form.Group controlId="formBasicNumber">
        <Form.Label>Number</Form.Label>
        <Form.Control
          type="text"
          name="number"
          placeholder="Enter phone number"
          value={number}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add contact
      </Button>
    </Form>
  );
}

// const mapDispatchToProps = dispatch => ({
//   onSubmit: ({ name, number }) =>
//     dispatch(actions.addContact({ name, number })),
// });

// export default connect(null, mapDispatchToProps)(ContactForm);

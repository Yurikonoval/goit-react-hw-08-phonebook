import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { operations, selectors } from 'redux/contacts';
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
    <form action="" onSubmit={handleSubmit} className={s.form}>
      <label className={s.label}>
        <span className={s.namespan}>Name</span>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          className={s.input}
          placeholder="Enter name"
        />
      </label>
      <label className={s.label}>
        <span className={s.numberspan}>Number</span>
        <input
          type="text"
          name="number"
          placeholder="Enter phone number"
          value={number}
          onChange={handleChange}
          className={s.input}
        />
      </label>
      <button className={s.button} type="submit">
        Add contact
      </button>
    </form>
  );
}

// const mapDispatchToProps = dispatch => ({
//   onSubmit: ({ name, number }) =>
//     dispatch(actions.addContact({ name, number })),
// });

// export default connect(null, mapDispatchToProps)(ContactForm);

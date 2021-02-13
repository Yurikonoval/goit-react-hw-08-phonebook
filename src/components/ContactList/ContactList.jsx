import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { operations, selectors } from 'redux/contacts';
import s from './ContactList.module.css';

export default function ContactList() {
  const contacts = useSelector(selectors.getVisibleContacts);

  const dispatch = useDispatch();

  const onDeleteContact = id => {
    dispatch(operations.deleteContact(id));
  };

  useEffect(() => {
    dispatch(operations.fetchContacts());
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <ul className={s.list}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={s.item}>
          <p className={s.contactData}>
            {name}: {number}
          </p>
          <button
            className={s.button}
            type="button"
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

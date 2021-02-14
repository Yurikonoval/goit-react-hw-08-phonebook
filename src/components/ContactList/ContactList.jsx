import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { operations, selectors } from 'redux/contacts';
import Button from 'react-bootstrap/Button';
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
          <Button
            variant="danger"
            type="button"
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </Button>
        </li>
      ))}
    </ul>
  );
}

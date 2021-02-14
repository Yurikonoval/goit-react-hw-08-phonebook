import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions, selectors } from 'redux/contacts';
import Form from 'react-bootstrap/Form';

const styles = {
  container: {
    width: 320,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
  },
};

export default function Filter() {
  const value = useSelector(selectors.getFilter);

  const dispatch = useDispatch();

  return (
    <div style={styles.container}>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Find contacts by name</Form.Label>
        <Form.Control
          type="text"
          name="filter"
          placeholder="Enter name"
          value={value}
          onChange={e => dispatch(actions.filterChange(e.target.value))}
        />
      </Form.Group>
    </div>
  );
}

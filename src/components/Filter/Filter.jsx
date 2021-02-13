import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions, selectors } from 'redux/contacts';

import s from './Filter.module.css';

export default function Filter() {
  const value = useSelector(selectors.getFilter);

  const dispatch = useDispatch();

  return (
    <label className={s.label}>
      <span className={s.labeltext}>Find contacts by name</span>
      <input
        className={s.input}
        type="text"
        name="filter"
        placeholder="Enter name"
        value={value}
        onChange={e => dispatch(actions.filterChange(e.target.value))}
      />
    </label>
  );
}

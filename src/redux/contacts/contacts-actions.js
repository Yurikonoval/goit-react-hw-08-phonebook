import { createAction } from '@reduxjs/toolkit';

export const filterChange = createAction('contacts/filterChange', value => ({
  payload: value,
}));

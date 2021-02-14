import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/signup', credentials);
      token.set(data.token);
      return data;
    } catch (error) {
      if (error.response.status === 400) {
        toast.error('Registration error, try to change email or password');
      }
      if (error.response.status === 500) {
        toast.error('Server error, please try registration later');
      }
      return thunkAPI.rejectWithValue();
    }
  },
);

const logIn = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const { data } = await axios.post('/users/login', credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    if (error.response.status === 400) {
      toast.error('Login error, check email and password!');
    }
    return thunkAPI.rejectWithValue(error.massage);
  }
});

const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    token.unset();
  } catch (error) {
    if (error.response.status === 401) {
      toast.error('LogOut error, contact with app stuff');
    }
    if (error.response.status === 500) {
      toast.error('Server error, please try logOut later');
    }
    return thunkAPI.rejectWithValue();
  }
});

const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    }
    token.set(persistedToken);
    try {
      console.log('пошкл запрос за юзером');
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      if (error.response.status === 400) {
        toast.error('problems with token, contact with app stuff');
      }
      return thunkAPI.rejectWithValue();
    }
  },
);

const operations = {
  register,
  logOut,
  logIn,
  fetchCurrentUser,
};
export default operations;

import React, { Suspense, useEffect, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppBar from './components/AppBar';
import Container from './components/Container';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import { authSelectors, authOperations } from 'redux/auth';
import Loader from 'components/Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';

const RegisterView = lazy(() => import('./views/RegisterView'));
const LoginView = lazy(() => import('./views/LoginView'));
const ContactsView = lazy(() => import('./views/ContactsView'));

function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(authSelectors.getFetchingCurrent);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    !isFetchingCurrentUser && (
      <Container>
        <AppBar />
        <Switch>
          <Suspense fallback={<Loader />}>
            <PublicRoute
              exact
              path="/register"
              redirectTo="/contacts"
              restricted
            >
              <RegisterView />
            </PublicRoute>
            <PublicRoute exact path="/login" redirectTo="/contacts" restricted>
              <LoginView />
            </PublicRoute>
            <PrivateRoute path="/contacts" redirectTo="/login">
              <ContactsView />
            </PrivateRoute>
          </Suspense>
        </Switch>
        <ToastContainer />
      </Container>
    )
  );
}
export default App;

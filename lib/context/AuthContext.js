import { removeCookie, setCookie } from '../utils/cookie';
import createDataContext from './createDataContext';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, error: action.payload, loading: false };
    case 'add_user':
      return { error: '', user: action.payload, loading: false };
    case 'clear_error_message':
      return { ...state, error: '' };
    case 'signout':
      return { user: null, error: '' };
    case 'loader':
      return { ...state, loading: true };
    default:
      return state;
  }
};

const reauthenticate = (dispatch) => {
  return (payload) => {
    dispatch({ type: 'add_user', payload });
  };
};

const clearError = (dispatch) => () => dispatch({ type: 'clear_error_message' });

const signup =
  (dispatch) =>
  async ({ email, password }) => {
    dispatch({ type: 'loader' });
    try {
      // const response = await trackerApi.post('/signup', { email, password });
      // await AsyncStorage.setItem('token', response.data.token);
      setTimeout(() => {
        dispatch({ type: 'add_user', payload: { email, password } });
        setCookie('user', { email, password });
      }, 5000);
    } catch (err) {
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign up',
      });
    }
  };

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    dispatch({ type: 'loader' });
    try {
      setTimeout(() => {
        setCookie('user', { email, password });
        dispatch({ type: 'add_user', payload: { email, password } });
      }, 5000);
    } catch (err) {
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign in',
      });
    }
  };

const signout = (dispatch) => async () => {
  removeCookie('user');
  dispatch({ type: 'signout' });
};

const { Context, Provider } = createDataContext(
  authReducer,
  { clearError, signout, signin, signup, reauthenticate },
  { error: '', user: null, loading: false }
);

export { Context as AuthContext, Provider as AuthProvider };

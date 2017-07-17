import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './auth_reducer';
import booksReducer from './books_reducer';
import tradesReducer from './trades_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  books: booksReducer,
  trades: tradesReducer
});

export default rootReducer;

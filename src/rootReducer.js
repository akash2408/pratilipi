import { combineReducers } from 'redux';

import flashMessages from './Reducers/flashMessages';
import isLoggedIn from './Reducers/isLoggedIn';

export default combineReducers({
  flashMessages,
  isLoggedIn
});

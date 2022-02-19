import { IS_LOGGED_IN  } from '../Actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = (localStorage.getItem('accessToken') ? true : false);

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case IS_LOGGED_IN:
      return action.status;
    default: return state;
  }
}

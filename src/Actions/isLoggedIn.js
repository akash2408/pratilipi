import { IS_LOGGED_IN } from './types';

export function setLoggedIn(status) {
  return {
    type: IS_LOGGED_IN,
    status
  };
}
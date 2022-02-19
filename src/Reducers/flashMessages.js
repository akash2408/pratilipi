import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from '../Actions/types';
import shortid from 'shortid';
import findIndex from 'lodash/findIndex';

function flashMessages (state = [], action = {}){
  switch(action.type) {
    case ADD_FLASH_MESSAGE:
      return [
        ...state,
        {
          id: shortid.generate(),
          type: action.message.type,
          text: action.message.text
        }
      ];
    case DELETE_FLASH_MESSAGE:
      const index = findIndex(state, { id: action.id });
      console.log(index);
      if (index >= 0) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ];
      }
      return state;

    default: return state;
  }
}

export default flashMessages
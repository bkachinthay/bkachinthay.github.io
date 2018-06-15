/*
 *
 * Ladders reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_ADD_MATCH_DIALOG_STATE,
} from './constants';

const initialState = fromJS({
  ladderIndex: false,
  playerRanking: [],
  showAddMatchDialog: false,
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ADD_MATCH_DIALOG_STATE:
      return state.set('showAddMatchDialog', action.show);
    default:
      return state;
  }
}

export default reducer;

/*
 *
 * Ladders reducer
 *
 */

import { fromJS } from 'immutable';

import {
  ADD_NEW_PLAYER,
  CHANGE_LADDER_NAME,
  UPDATE_LADDERS,
} from 'containers/Ladders/constants';
import {
  SAVE_MATCH_DETAIL,
} from 'containers/LadderDetail/constants';
import {
  SET_ALLERT_MESSAGE,
} from './constants';

const initialState = fromJS({
  alertMessage: false,
  ladders: [],
  addLadder: {
    ladderName: false,
    players: [],
    matches: [],
  },
});

function laddersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALLERT_MESSAGE:
      return state.set('alertMessage', action.message);
    case ADD_NEW_PLAYER:
      return state.updateIn(['addLadder', 'players'], (list) =>
        list.push(action.player)
      );
    case CHANGE_LADDER_NAME:
      return state.setIn(['addLadder', 'ladderName'], action.name);
    case UPDATE_LADDERS: {
      const ladder = state.get('addLadder');
      const newState = state.set('addLadder', initialState.get('addLadder'));

      if (action.id !== null) {
        return newState
          .setIn(['ladders', action.id], ladder);
      }
      return newState
        .update('ladders', (list) => list.push(ladder));
    }
    case SAVE_MATCH_DETAIL: {
      const {
        index,
        player1,
        player2,
        matchTime,
        location,
        result,
        matchIndex,
      } = action.match;

      if (typeof matchIndex === 'number') {
        return state
          .setIn(['ladders', index, 'matches', matchIndex], {
            matchIndex,
            player1,
            player2,
            matchTime,
            location,
            result,
          });
      }

      return state
        .updateIn(['ladders', index, 'matches'],
          (matches) => matches.push({
            matchIndex: matches.size,
            player1,
            player2,
            matchTime,
            location,
            result,
          }));
    }
    default:
      return state;
  }
}

export default laddersReducer;

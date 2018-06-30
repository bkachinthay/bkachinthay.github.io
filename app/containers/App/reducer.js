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
  SET_ADD_LADDER_STATE,
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
      const newLadder = state.get('addLadder');
      const newState = state.set('addLadder', initialState.get('addLadder'));
      const ladderCount = state.get('ladders').size;

      if (action.id !== null && action.id >= 0 && action.id < ladderCount) {
        return newState
          .updateIn(
            ['ladders', action.id],
            (ladder) => ladder
              .set('ladderName', newLadder.get('ladderName'))
              .set('players', newLadder.get('players'))
          );
      }
      return newState
        .update('ladders', (list) => list.push(newLadder));
    }
    case SET_ADD_LADDER_STATE: {
      if (typeof action.id === 'number') {
        const ladder = state.getIn(['ladders', action.id]);
        return state.set('addLadder', ladder);
      }
      return state;
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

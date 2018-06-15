/*
 *
 * Ladders actions
 *
 */

import {
  ADD_NEW_PLAYER,
  CHANGE_LADDER_NAME,
  ADD_LADDER,
  UPDATE_LADDERS,
} from './constants';

export function addNewPlayer(player) {
  return {
    type: ADD_NEW_PLAYER,
    player,
  };
}

export function changeLadderName(name) {
  return {
    type: CHANGE_LADDER_NAME,
    name,
  };
}

export function addLadder(id = null) {
  return {
    type: ADD_LADDER,
    id,
  };
}

export function updateLadder(id = null) {
  return {
    type: UPDATE_LADDERS,
    id,
  };
}

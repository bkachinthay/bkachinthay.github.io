/*
 *
 * LadderDetail actions
 *
 */
import {
  ADD_MATCH,
  SAVE_MATCH_DETAIL,
  SET_ADD_MATCH_DIALOG_STATE,
} from './constants';

export function addMatch(payload) {
  return {
    type: ADD_MATCH,
    payload,
  };
}

export function saveMatchDetail(match) {
  return {
    type: SAVE_MATCH_DETAIL,
    match,
  };
}

export function setAddMatchDialogState(show = false) {
  return {
    type: SET_ADD_MATCH_DIALOG_STATE,
    show,
  };
}

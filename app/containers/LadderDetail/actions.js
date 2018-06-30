/*
 *
 * LadderDetail actions
 *
 */
import {
  ADD_MATCH,
  SAVE_MATCH_DETAIL,
  OPEN_EDIT_LADDER_FORM,
  SET_ADD_MATCH_DIALOG_STATE,
  SET_ADD_LADDER_STATE,
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

export function openEditLadderForm(id = null) {
  return {
    type: OPEN_EDIT_LADDER_FORM,
    id,
  };
}

export function setAddLadderState(id = null) {
  return {
    type: SET_ADD_LADDER_STATE,
    id,
  };
}

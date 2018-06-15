/*
 *
 * Ladder actions
 *
 */

import {
  SET_ALLERT_MESSAGE,
} from './constants';

export function setAlertMessage(message) {
  return {
    type: SET_ALLERT_MESSAGE,
    message,
  };
}

import { takeEvery, put } from 'redux-saga/effects';
import { setAlertMessage } from 'containers/App/actions';
import {
  saveMatchDetail,
  setAddMatchDialogState,
} from './actions';
import { ADD_MATCH } from './constants';

export function* addMatch(action) {
  const {
    index,
    player1,
    player2,
    matchTime,
    location,
    result,
    matchIndex,
  } = action.payload;
  if (!player1 || !player2) {
    yield put(setAlertMessage('Both Player names are needed!'));
  } else if (!matchTime) {
    yield put(setAlertMessage('Please enter match time!'));
  } else if (!location) {
    yield put(setAlertMessage('Please enter match location!'));
  } else {
    yield put(saveMatchDetail({
      index,
      player1,
      player2,
      matchTime,
      location,
      result,
      matchIndex,
    }));

    yield put(setAddMatchDialogState());
  }
}

export default function* watchAddMatch() {
  yield takeEvery(ADD_MATCH, addMatch);
}

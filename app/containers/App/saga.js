import { takeEvery, all, select, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  ADD_LADDER,
} from 'containers/Ladders/constants';

import { OPEN_EDIT_LADDER_FORM } from 'containers/LadderDetail/constants';

import {
  makeSelectPlayers,
  makeSelectLadders,
  makeSelectLadderName,
} from 'containers/Ladders/selectors';

import { updateLadder } from 'containers/Ladders/actions';
import { setAddLadderState } from 'containers/LadderDetail/actions';
import { setAlertMessage } from './actions';

export function* addLadder(action) {
  const ladderName = yield select(makeSelectLadderName());
  if (!ladderName) {
    yield put(setAlertMessage('Enter ladder name!'));
    return;
  }

  const ladders = yield select(makeSelectLadders());
  const ladderNames = ladders.map((ladder) => ladder.ladderName.toUpperCase());
  const ladderIndex = ladderNames.indexOf(ladderName.toUpperCase());
  if (ladderIndex !== -1 && ladderIndex !== parseInt(action.id, 10)) {
    yield put(setAlertMessage('Ladder name should be unique!'));
    return;
  }

  const playerList = yield select(makeSelectPlayers());
  if (!playerList || playerList.length === 0) {
    yield put(setAlertMessage('Add players to create Ladder!'));
    return;
  }
  yield put(updateLadder(action.id));

  if (action.id === null || action.id < 0 || action.id >= ladders.length) {
    yield put(push('/ladders'));
  } else {
    yield put(push(`/ladder/${action.id}`));
  }
}

export function* watchAddLadder() {
  yield takeEvery(ADD_LADDER, addLadder);
}

export function* openEditLadderForm(action) {
  if (action.id === null) {
    yield put(push('/ladder/add'));
  } else {
    const id = parseInt(action.id, 10);
    yield put(setAddLadderState(id));
    yield put(push(`/ladder/${id}/edit`));
  }
}

export function* watchOpenLadderForm() {
  yield takeEvery(OPEN_EDIT_LADDER_FORM, openEditLadderForm);
}

export default function* rootSaga() {
  yield all([
    watchAddLadder(),
    watchOpenLadderForm(),
  ]);
}

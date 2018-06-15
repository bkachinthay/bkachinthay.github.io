import { createSelector } from 'reselect';
import { selectApp } from 'containers/App/selectors';

const makeSelectLadders = () => createSelector(
  selectApp,
  (appState) => appState.get('ladders').toJS()
);

const makeSelectAddLadder = () => createSelector(
  selectApp,
  (appState) => appState.get('addLadder')
);

const makeSelectPlayers = () => createSelector(
  makeSelectAddLadder(),
  (addLadderState) => addLadderState.get('players').toJS()
);

const makeSelectLadderName = () => createSelector(
  makeSelectAddLadder(),
  (addLadderState) => {
    const ladderName = addLadderState.get('ladderName');
    return typeof ladderName === 'string' ? ladderName : '';
  }
);

export {
  makeSelectLadders,
  makeSelectAddLadder,
  makeSelectPlayers,
  makeSelectLadderName,
};

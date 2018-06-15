import { createSelector } from 'reselect';
import { selectApp } from 'containers/App/selectors';
import each from 'lodash/each';

const makeSelectLadders = () => createSelector(
  selectApp,
  (appState) => appState.get('ladders')
);

const selectLadderId = (state, props) => props.match.params.id || null;

const makeSelectLadder = () => createSelector(
  [makeSelectLadders(), selectLadderId],
  (ladders, ladderId) => {
    const id = parseInt(ladderId, 10);
    if (typeof id === 'number' && id >= 0 && id < ladders.size) {
      return ladders.get(id);
    }
    return null;
  }
);

const makeSelectLadderName = () => createSelector(
  makeSelectLadder(),
  (ladderState) => ladderState && ladderState.get('ladderName') ?
    ladderState.get('ladderName') :
    ''
);

const makeSelectMatches = () => createSelector(
  makeSelectLadder(),
  (ladderState) => ladderState && ladderState.get('matches') ?
    ladderState.get('matches').toJS() :
    []
);

const makeSelectPlayers = () => createSelector(
  makeSelectLadder(),
  (ladderState) => ladderState && ladderState.get('players') ?
    ladderState.get('players').toJS() :
    []
);

const makeSelectRankedPlayers = () => createSelector(
  [makeSelectPlayers(), makeSelectMatches()],
  (players, matches) => {
    const playerScore = {};

    // generate map of player scores
    each(matches, (match) => {
      if (match.result === 'draw') {
        playerScore[match.player1] = playerScore[match.player1] ? playerScore[match.player1] + 1 : 1;
        playerScore[match.player2] = playerScore[match.player2] ? playerScore[match.player2] + 1 : 1;
      } else if (match.result) {
        playerScore[match.result] = playerScore[match.result] ? playerScore[match.result] + 2 : 2;
      }
    });

    // map score of each players.
    // then sort player list on score of players
    return players.map((player) => ({
      ...player,
      score: playerScore[player.name] || 0,
    })).sort((playerA, playerB) => playerA.score < playerB.score);
  }
);

const selectLadderDetail = (state) => state.get('ladderDetail');

const makeSelectAddMatchDialog = () => createSelector(
  selectLadderDetail,
  (ladderDetailState) => ladderDetailState.get('showAddMatchDialog')
);

export {
  selectLadderId,
  makeSelectLadder,
  makeSelectLadderName,
  makeSelectMatches,
  makeSelectPlayers,
  makeSelectRankedPlayers,
  selectLadderDetail,
  makeSelectAddMatchDialog,
};

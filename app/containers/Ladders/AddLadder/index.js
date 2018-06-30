import React from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import AddLadder from 'components/AddLadder';

import {
  addNewPlayer,
  changeLadderName,
  addLadder,
} from '../actions';

import {
  makeSelectPlayers,
  makeSelectLadderName,
} from '../selectors';

const AddLadderContainer = (props) => (<AddLadder {...props} />);

const mapStateToProps = createStructuredSelector({
  playerList: makeSelectPlayers(),
  ladderName: makeSelectLadderName(),
});

export default connect(
  mapStateToProps, {
    goBack,
    addNewPlayer,
    changeLadderName,
    addLadder,
  })(AddLadderContainer);

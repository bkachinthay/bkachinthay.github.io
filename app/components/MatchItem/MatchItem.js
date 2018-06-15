import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
} from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

import Matched from './Matched';
import DateLocation from './DateLocation';

const styles = {
  listItem: {
    padding: 0,
  },
  root: {
    display: 'flex',
    flexFlow: 'column wrap',
    width: '100%',
  },
  match: {
    // flexGrow: 1,
    flex: '1 100%',
    display: 'flex',
  },
};

const MatchItem = ({ classes, match, onMatchClick }) => (
  <ListItem
    button
    onClick={() => onMatchClick(match)}
    divider
    className={classes.listItem}
  >
    <div className={classes.root}>
      <Matched
        inheritedClass={classes.match}
        player1={match.player1}
        player2={match.player2}
        result={match.result}
      />
      <DateLocation
        time={match.matchTime}
        location={match.location}
      />
    </div>
  </ListItem>
);

MatchItem.propTypes = {
  classes: PropTypes.object.isRequired,
  onMatchClick: PropTypes.func.isRequired,
  match: PropTypes.shape({
    player1: PropTypes.string,
    player2: PropTypes.string,
    matchTime: PropTypes.number,
    location: PropTypes.string,
    result: PropTypes.string,
  }),
};

export default withStyles(styles)(MatchItem);

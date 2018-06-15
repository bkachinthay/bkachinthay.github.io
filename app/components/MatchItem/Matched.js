import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import PlayerChip from './PlayerChip';

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  verses: {
    margin: '0.5% 0.5%',
    width: 3,
    backgroundColor: theme.primary.main,
  },
  arrow: {
    margin: 'auto 0',
  },
  winnerArrow: {
    color: '#009933',
  },
  drawArrow: {
    color: '#ff9900',
  },
  arrowPlaceholder: {
    height: 24,
    width: 24,
    flexShrink: 0,
    display: 'inline-block',
  },
});

const Matched = ({ classes, player1, player2, result, inheritedClass }) => (
  <div className={classNames(inheritedClass, classes.root)}>
    <PlayerChip
      name={player1} // .name
      // avatarSrc={player1.avatarSrc}
      left
    />
    {player1 === result || result === 'draw' ?
      <ArrowLeftIcon
        className={classNames(classes.arrow, {
          [classes.winnerArrow]: player1 === result,
          [classes.drawArrow]: result === 'draw',
        })}
      /> :
      <div className={classNames(classes.arrow, classes.arrowPlaceholder)} />
    }
    <div className={classes.verses} />
    {player2 === result || result === 'draw' ?
      <ArrowRightIcon
        className={classNames(classes.arrow, {
          [classes.winnerArrow]: player2 === result,
          [classes.drawArrow]: result === 'draw',
        })}
      /> :
      <div className={classNames(classes.arrow, classes.arrowPlaceholder)} />
    }
    <PlayerChip
      name={player2} // .name
      // avatarSrc={player2.avatarSrc}
    />
  </div>
);

Matched.propTypes = {
  classes: PropTypes.object.isRequired,
  player1: PropTypes.string,
  player2: PropTypes.string,
  result: PropTypes.string,
  inheritedClass: PropTypes.string,
};

export default withStyles(styles)(Matched);

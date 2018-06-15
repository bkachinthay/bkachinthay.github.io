import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import { withStyles } from 'material-ui';
import TodayIcon from '@material-ui/icons/Today';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PlaceIcon from '@material-ui/icons/Place';

const styles = (theme) => ({
  root: {
    flex: '1 100%',
    wordBreak: 'break-word',
    display: 'flex',
    justifyContent: 'left',
    height: 'auto',
  },
  item: {
    flexShrink: 0,
    margin: '5px 2%',
    height: 24,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    // whiteSpace: 'nowrap',
    // overflow: 'hidden',
    // textOverflow: 'ellipsis',
    // width: '30%',
  },
  iconStyle: {
    color: theme.secondary.main,
  },
});

const DateLocation = ({ classes, time, location }) => (
  <div className={classes.root}>
    <div className={classes.item}>
      <TodayIcon className={classes.iconStyle} /> {format(time, 'YYYY-MM-DD')}
    </div>
    <div className={classes.item}>
      <AccessTimeIcon className={classes.iconStyle} /> {format(time, 'hh:mm A')}
    </div>
    <div className={classes.item}>
      <PlaceIcon className={classes.iconStyle} /> {location}
    </div>
  </div>
);

DateLocation.propTypes = {
  classes: PropTypes.object.isRequired,
  time: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
};

export default withStyles(styles)(DateLocation);

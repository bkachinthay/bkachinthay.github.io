import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = {
  root: {
    flex: '0 0 auto',
  },
  appbar: {
    boxShadow: 'none',
  },
  flex: {
    flex: 1,
  },
};

const LayoutAppBar = ({
  classes,
  title,
  tabs,
  iconElementLeft,
  iconElementRight,
}) => (
  <AppBar className={classes.appbar} position="static" color="primary">
    <Toolbar className={classes.root}>
      {iconElementLeft}
      <Typography variant="title" color="inherit" className={classes.flex}>
        {title}
      </Typography>
      {iconElementRight}
    </Toolbar>
    {tabs}
  </AppBar>
);

LayoutAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  iconElementRight: PropTypes.node,
  iconElementLeft: PropTypes.node,
  tabs: PropTypes.node,
};

export default withStyles(styles)(LayoutAppBar);

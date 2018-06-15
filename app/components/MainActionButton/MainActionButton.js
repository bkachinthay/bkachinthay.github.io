import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    position: 'fixed',
    bottom: 22,
    right: 20,
    transform: 'translate3d(0, 0, 0)',
  },
};

const MainActionButton = ({ classes, onClick }) => (
  <Button
    variant="fab"
    color="secondary"
    aria-label="add"
    onClick={onClick}
    className={classes.root}
  >
    <AddIcon />
  </Button>
);

MainActionButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(MainActionButton);

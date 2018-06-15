import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    flex: '1 1 auto',
    overflowY: 'auto',
    minHeight: 0,
    overflowX: 'hidden',
  },
  fullHeight: {
    height: '100%',
  },
};

const ScrollView = ({ children, classes, fullHeight, ...rest }) => (
  <div
    className={classNames(classes.root, {
      [classes.fullHeight]: fullHeight,
    })}
    {...rest}
  >
    {children}
  </div>
);

ScrollView.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  fullHeight: PropTypes.bool,
};

ScrollView.defaultProps = {
  fullHeight: false,
};

export default withStyles(styles)(ScrollView);

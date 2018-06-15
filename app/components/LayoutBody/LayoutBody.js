import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    margin: '0 0 38px',
  },
  rootResponsive: {
    '@media (min-width: 600px)': {
      width: 'auto',
      marginLeft: 40,
      marginRight: 40,
    },
    '@media (min-width: 920px)': {
      width: 840,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    '@media (min-width: 1260px)': {
      width: '66.66%',
    },
    '@media (min-width: 1800px)': {
      width: 1200,
    },
  },
  rootFullHeight: {
    height: '100%',
    marginBottom: 0,
  },
};

const LayoutBody = ({ children, classes, fullHeight, fullWidth, style, ...rest }) => (
  <div
    className={classNames(classes.root, {
      [classes.rootResponsive]: !fullWidth,
      [classes.rootFullHeight]: fullHeight,
    })}
    style={style}
    {...rest}
  >
    {children}
  </div>
);

LayoutBody.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  fullHeight: PropTypes.bool,
  fullWidth: PropTypes.bool,
  style: PropTypes.object,
};

LayoutBody.defaultProps = {
  fullHeight: false,
  fullWidth: false,
};

export default withStyles(styles)(LayoutBody);

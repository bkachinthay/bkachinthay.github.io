import React from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { lightBlack } from 'material-ui/colors/common';

const styles = {
  root: {
    width: '100%',
    display: 'flex',
  },
  body: {
    flexGrow: 1,
  },
  description: {
    fontSize: 12,
    lineHeight: '20px',
    color: lightBlack,
  },
  right: {
    flexShrink: 0,
    wordBreak: 'break-word',
    maxWidth: '45%',
  },
};

const ListItemBody = ({ classes, description, right, title }) => (
  <div className={classes.root}>
    <div className={classes.body}>
      <Typography variant="headline" component="h5">
        {title}
      </Typography>
      <Typography component="p" className={classes.description}>
        {description}
      </Typography>
    </div>
    <span className={classes.right}>
      {right}
    </span>
  </div>
);

ListItemBody.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  right: PropTypes.node,
};

export default withStyles(styles)(ListItemBody);
// export default ListItemBody;

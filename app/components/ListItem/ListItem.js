import React from 'react';
import PropTypes from 'prop-types';

import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';

import ListItemBody from './ListItemBody';

const styles = {
  avatar: {
    alignSelf: 'flex-start',
    marginRight: 15,
    flexShrink: 0,
  },
  item: {
    maxHeight: 65,
  },
};

const ListItemWrapper = ({
  classes,
  title,
  description,
  avatarSrc,
  infoComponent,
  handleClick,
}) => (
  <ListItem
    button
    onClick={handleClick}
    divider
    className={classes.item}
  >
    <Avatar
      className={classes.avatar}
      alt={title}
      src={avatarSrc}
    >
      {title.charAt(0).toUpperCase()/* title.slice(0,2).toUpperCase() */}
    </Avatar>
    <ListItemBody
      title={title}
      description={description}
      right={infoComponent}
    />
  </ListItem>
);

ListItemWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  avatarSrc: PropTypes.string,
  infoComponent: PropTypes.node,
  handleClick: PropTypes.func,
};

export default withStyles(styles)(ListItemWrapper);

import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

import PlayerAvatar from 'components/PlayerAvatar';

const styles = {
  root: {
    display: 'flex',
    padding: '8px 0',
    alignItems: 'center',
    width: '45%',
  },
  rootLeft: {
    flexDirection: 'row-reverse',
  },
  name: {
    fontSize: 13,
  },
  nameLeft: {
    paddingRight: 8,
  },
  nameRight: {
    paddingLeft: 8,
  },
};

const inlineStyles = {
  avatar: {
    flexShrink: 0,
  },
};

const PlayerChip = ({ classes, name, style, avatarSrc, left }) => (
  <span
    className={classNames(classes.root, {
      [classes.rootLeft]: left,
    })}
    style={style}

  >
    <PlayerAvatar
      name={name}
      size={32}
      src={avatarSrc}
      style={inlineStyles.avatar}
    />
    <span
      className={classNames(classes.name, {
        [classes.nameLeft]: left,
        [classes.nameRight]: !left,
      })}
    >
      {name}
    </span>
  </span>
);

PlayerChip.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
  avatarSrc: PropTypes.string,
  left: PropTypes.bool,
};

export default withStyles(styles)(PlayerChip);

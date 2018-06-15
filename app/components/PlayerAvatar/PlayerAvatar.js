import React from 'react';
import PropTypes from 'prop-types';

import Avatar from 'material-ui/Avatar';

const PlayerAvatar = ({ name, src, size, ...rest }) => {
  if (src) {
    return <Avatar src={src} size={size} {...rest} />;
  }

  return (
    <Avatar size={size} {...rest}>
      {name.charAt(0).toUpperCase()}
    </Avatar>
  );
};

PlayerAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
  size: PropTypes.number,
};

PlayerAvatar.defaultProps = {
  size: 40,
};

export default PlayerAvatar;

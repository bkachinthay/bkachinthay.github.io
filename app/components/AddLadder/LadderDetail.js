import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
} from 'material-ui/List';
import PeopleIcon from '@material-ui/icons/People';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

import PlayerAvatar from 'components/PlayerAvatar';
import AddPlayer from './AddPlayer';

const styles = {
  root: {
    paddingTop: 20,
    color: 'red',
  },
  playerList: {
    paddingLeft: 30,
    color: 'red',
  },
  listElement: {
    color: 'black',
  },
  listItemText: {
    primary: {
      color: '#000',
    },
  },
};

const inlineStyle = {
  listItemBody: {
    margin: '-16px 0 0',
  },
};

// const PLAYERS = [
//   { name: 'Awerwef', description: 'asdf asdf sfewr', avatarSrc: '' },
//   { name: 'Awerwea', description: 'asdf asdf sfewr', avatarSrc: '' },
//   { name: 'Awerweb', description: 'asdf asdf sfewr', avatarSrc: '' },
//   { name: 'Awerwef1', description: 'asdf asdf sfewr', avatarSrc: '' },
//   { name: 'Awerwef2', description: 'asdf asdf sfewr', avatarSrc: '' },
//   { name: 'Awerwef3', description: 'asdf asdf sfewr', avatarSrc: '' },
// ];

class LadderDetail extends Component {
  constructor(props) {
    super(props);
    this.isValidPlayerName = this.isValidPlayerName.bind(this);
  }

  isValidPlayerName(name) {
    const { playerList } = this.props;
    const playerNames = playerList.map((player) => player.name.toUpperCase());
    return playerNames.indexOf(name.toUpperCase()) === -1;
  }

  render() {
    const {
      classes,
      addNewPlayer,
      playerList,
      ladderName,
      changeLadderName,
    } = this.props;

    return (
      <Paper square className={classes.root} >
        <ListItem disabled>
          <TextField
            placeholder="e.g. Pineapple cup"
            value={ladderName}
            fullWidth
            onChange={(e) => changeLadderName(e.target.value)}
            style={inlineStyle.listItemBody}
            label="Ladder Name"
            // autoFocus={false}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon
            className={classes.listElement}
          >
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            className={classes.listItemText}
            primary="Players"
          />
        </ListItem>
        <List component="div" className={classes.playerList}>
          {playerList.map((player) => (
            <ListItem
              key={`player-${player.name}`}
            >
              <ListItemAvatar>
                <PlayerAvatar
                    // size={}
                  name={player.name}
                  src={player.avatarSrc}
                />
              </ListItemAvatar>
              <ListItemText
                className={classes.listItemText}
                primary={player.name}
                secondary={player.description}
              />
            </ListItem>
            ))}
          <AddPlayer
            isValidPlayerName={this.isValidPlayerName}
            addNewPlayer={addNewPlayer}
          />
        </List>
      </Paper>
    );
  }
}

LadderDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  ladderName: PropTypes.string.isRequired,
  changeLadderName: PropTypes.func.isRequired,
  playerList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  })).isRequired,
  addNewPlayer: PropTypes.func.isRequired,
};

export default withStyles(styles)(LadderDetail);

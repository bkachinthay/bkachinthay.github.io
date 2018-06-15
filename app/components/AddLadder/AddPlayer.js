import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
} from 'material-ui/List';
import AddIcon from '@material-ui/icons/Add';

import AddPlayerDialog from './AddPlayerDialog';

class AddPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
    };
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(player) {
    this.setState({
      openDialog: false,
    });
    this.props.addNewPlayer(player);
  }

  render() {
    const { openDialog } = this.state;
    const { isValidPlayerName } = this.props;
    return (
      <div>
        <ListItem
          button
          onClick={() => this.setState({ openDialog: true })}
        >
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText
            primary="Add a new player"
          />
        </ListItem>
        <AddPlayerDialog
          open={openDialog}
          handleClose={() => this.setState({ openDialog: false })}
          handleSave={this.handleSave}
          isValidPlayerName={isValidPlayerName}
        />
      </div>
    );
  }
}

AddPlayer.propTypes = {
  isValidPlayerName: PropTypes.func.isRequired,
  addNewPlayer: PropTypes.func.isRequired,
};

export default AddPlayer;

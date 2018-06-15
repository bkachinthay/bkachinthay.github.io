import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

class AddPlayerDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      nameError: '',
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleSave(e) {
    e.preventDefault();
    const { handleSave, isValidPlayerName } = this.props;
    const { name, description } = this.state;

    if (!name) {
      this.setState({
        nameError: 'Player name required!',
      });
      return;
    } else if (!isValidPlayerName(name)) {
      this.setState({
        nameError: 'Player name should be unique!',
      });
      return;
    }
    this.setState({
      name: '',
      description: '',
      nameError: '',
    });
    handleSave({
      name,
      description,
    });
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleNameChange(event) {
    if (this.state.nameError) {
      this.setState({
        name: event.target.value,
        nameError: '',
      });
    } else {
      this.setState({
        name: event.target.value,
      });
    }
  }

  handleClose() {
    const { handleClose } = this.props;
    this.setState({
      name: '',
      description: '',
      nameError: '',
    });
    handleClose();
  }

  render() {
    const { open } = this.props;
    const { name, description, nameError } = this.state;
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
      >
        <DialogTitle>
          New Player Details
        </DialogTitle>
        <form onSubmit={this.handleSave}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={nameError || 'Player Name'}
              error={Boolean(nameError)}
              fullWidth
              autoComplete="off"
              placeholder="e.g. Captain Hook"
              value={name}
              onChange={this.handleNameChange}
            />
            <TextField
              margin="dense"
              id="description"
              label={'Player Description'}
              rowsMax="3"
              multiline
              fullWidth
              autoComplete="off"
              placeholder="e.g. Has hooks for hands"
              value={description}
              onChange={this.handleChange('description')}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClose}
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

AddPlayerDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  isValidPlayerName: PropTypes.func.isRequired,
};

export default AddPlayerDialog;

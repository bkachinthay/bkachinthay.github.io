import React, { Component } from 'react';
import PropTypes from 'prop-types';
import filter from 'lodash/filter';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import getTime from 'date-fns/get_time';
import SelectWrapper from 'components/SelectWrapper';
import DateTimePicker from 'components/DateTimePicker';
import { MenuItem } from 'material-ui/Menu';

const styles = {
  paper: {
    overflowY: 'visible',
  },
  contentRoot: {
    overflowY: 'visible',
  },
  formControl: {
    minWidth: 120,
  },
};

const filterPlayerList = (playerList, excludePlayerName) =>
  filter(playerList, ({ value }) => !excludePlayerName || value !== excludePlayerName);

class AddMatchDialog extends Component {
  constructor(props) {
    super(props);

    let player1 = '';
    let player2 = '';
    let matchTime = getTime(new Date());
    let location = '';
    let result = '';

    if (typeof props.open === 'object') {
      player1 = props.open.player1;
      player2 = props.open.player2;
      matchTime = props.open.matchTime;
      location = props.open.location;
      result = props.open.result;
    }

    this.state = {
      player1,
      player2,
      matchTime,
      location,
      result,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    // when dialog is opened,
    // if open prop is an object use values in it to intialize
    // the component state else set state to default values.
    if (newProps.open && !this.props.open) {
      let player1 = '';
      let player2 = '';
      let matchTime = getTime(new Date());
      let location = '';
      let result = '';

      if (typeof newProps.open === 'object') {
        player1 = newProps.open.player1;
        player2 = newProps.open.player2;
        matchTime = newProps.open.matchTime;
        location = newProps.open.location;
        result = newProps.open.result;
      }

      this.setState({
        player1,
        player2,
        matchTime,
        location,
        result,
      });
    }
  }

  handlePlayerChange = (name) => (value) => {
    this.setState({
      [name]: value,
    });
  }

  handleTextFieldChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      player1,
      player2,
      matchTime,
      location,
      result,
    } = this.state;
    const { open } = this.props;
    const matchIndex = typeof open === 'object' ? open.matchIndex : null;

    this.props.handleSaveMatch({
      player1,
      player2,
      matchTime,
      location,
      result,
      matchIndex,
    });
  }

  render() {
    const {
      open,
      handleClose,
      classes,
      playerList,
    } = this.props;

    const {
      player1,
      player2,
      matchTime,
      location,
      result,
    } = this.state;

    return (
      <Dialog
        classes={{
          paper: classes.paper,
        }}
        open={Boolean(open)}
        onClose={handleClose}
      >
        <DialogTitle>
          New Match Details
        </DialogTitle>
        <form onSubmit={this.handleSubmit}>
          <DialogContent
            className={classes.contentRoot}
          >
            <SelectWrapper
              autoFocus
              fullWidth
              margin="dense"
              id="player1"
              label={'Player 1'}
              name="player1"
              options={filterPlayerList(playerList, player2)}
              value={player1}
              onChange={this.handlePlayerChange('player1')}
            />
            <SelectWrapper
              fullWidth
              margin="dense"
              id="player2"
              label={'Player 2'}
              name="player2"
              options={filterPlayerList(playerList, player1)}
              value={player2}
              onChange={this.handlePlayerChange('player2')}
            />
            <br />
            <DateTimePicker
              label="time"
              defaultValue={matchTime}
              onChange={this.handlePlayerChange('matchTime')}
            />
            <TextField
              margin="dense"
              id="location"
              label={'Location'}
              fullWidth
              value={location}
              onChange={this.handleTextFieldChange('location')}
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="result-simple">Result</InputLabel>
              <Select
                disabled={Boolean(!player1 || !player2)}
                value={result}
                onChange={this.handleTextFieldChange('result')}
                input={<Input id="result-simple" />}
              >
                <MenuItem value={''}>Yet to be Played</MenuItem>
                <MenuItem value={'draw'}>Draw</MenuItem>
                <MenuItem value={player1}>{player1} won</MenuItem>
                <MenuItem value={player2}>{player2} won</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

AddMatchDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.object.isRequired,
  ]),
  handleClose: PropTypes.func.isRequired,
  handleSaveMatch: PropTypes.func.isRequired,
  playerList: PropTypes.array.isRequired,
};

export default withStyles(styles)(AddMatchDialog);

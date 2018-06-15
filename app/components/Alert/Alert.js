import React from 'react';
import PropTypes from 'prop-types';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

const Alert = ({
  handleClose,
  alertMessage,
}) => (
  <Dialog
    open={Boolean(alertMessage)}
    onClose={handleClose}
  >
    <DialogContent>
      <DialogContentText>
        {alertMessage || ''}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        color="primary"
        onClick={handleClose}
      >
        OK
      </Button>
    </DialogActions>
  </Dialog>
);

Alert.propTypes = {
  handleClose: PropTypes.func.isRequired,
  alertMessage: PropTypes.string,
};

export default Alert;

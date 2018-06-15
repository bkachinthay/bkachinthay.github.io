import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Alert from 'components/Alert';
import { makeSelectAlertText } from './selectors';
import { setAlertMessage } from './actions';

const AlertContainer = (props) => (<Alert {...props} />);

const mapStateToProps = createStructuredSelector({
  alertMessage: makeSelectAlertText(),
});

export default connect(
  mapStateToProps, {
    handleClose: () => setAlertMessage(''),
  }
)(AlertContainer);

import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import getTime from 'date-fns/get_time';
import TextField from 'material-ui/TextField';

const DateTimePicker = ({
  label,
  onChange,
  defaultValue,
}) => (
  <TextField
    // fullWidth
    id="datetime-local"
    label={label}
    type="datetime-local"
    defaultValue={format((new Date(defaultValue)), 'YYYY-MM-DD[T]HH:mm')}
    InputLabelProps={{
      shrink: true,
    }}
    onChange={(e) => onChange(getTime(e.target.value))}
  />
);

DateTimePicker.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.number,
};

export default DateTimePicker;

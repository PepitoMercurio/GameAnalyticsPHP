import React from 'react';
import PropTypes from 'prop-types';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
/**
A React functional component for rendering an input element.
@param {Object} props - The props object containing the classname, required, name, placeholder, value, type, onChange, and dataOnChange props.
@param {string} props.classname - The CSS class(es) to be applied to the input element.
@param {boolean} props.required - A boolean value indicating whether the input is required or not.
@param {string} name - The name of the input element.
@param {string} placeholder - The placeholder text to be displayed inside the input element.
@param {string} value - The value of the input element.
@param {string} type - The type of the input element (e.g. "text", "email", "password").
@param {function} props.onChange - The function to be called when the input value changes.
@param {Object} props.dataOnChange - An object containing the state and setState functions for updating the input's value and the name of the input element.
@returns {JSX.Element} - An input element with the specified props.
*/

const InputPassword = ({
  classname,
  required,
  placeholder,
  value,
  onChange,
  dataOnChange,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [isVisible, setIsVisible] = React.useState(false);
  const handleVisibilityToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        className={classname}
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          onChange(
            dataOnChange.state,
            dataOnChange.setState,
            dataOnChange.name,
            e.target.value
          )
        }
        required={required}
        label="Password"
      />
    </FormControl>
  );
};

export default InputPassword;

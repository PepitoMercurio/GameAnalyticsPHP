import React from 'react';
import PropTypes from 'prop-types';

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

const Input = ({
  classname,
  required,
  name,
  placeholder,
  value,
  type,
  onChange,
  dataOnChange,
}) => {
  return (
    <input
      name={name}
      className={classname}
      placeholder={placeholder}
      type={type}
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
    />
  );
};

Input.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool,
  dataOnChange: PropTypes.object.isRequired,
};

export default Input;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UploadIcon from '@mui/icons-material/Upload';

/**
 * A reusable component for handling input of image files.
 * @param {Object} props - The props object.
 * @param {string} props.classname - The class name for the input element.
 * @param {boolean} props.required - Whether the input is required or not.
 * @param {string} props.name - The name attribute of the input element.
 * @param {string} props.placeholder - The placeholder text for the input element.
 * @param {string} props.value - The value of the input element.
 * @param {function} props.onChange - The function to call when the input value changes.
 * @param {Object} props.dataOnChange - An object containing state and setState functions, and the name of the input element.
 * @returns {JSX.Element} - The JSX element representing the component.
 */
const InputImageFile = ({
  classname,
  required,
  name,
  placeholder,
  value,
  onChange,
  dataOnChange,
}) => {
  const [fileName, setFileName] = useState('');

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onChange(
        dataOnChange.state,
        dataOnChange.setState,
        dataOnChange.name,
        file
      );
    }
  };

  return (
    <>
      <label className={classname}>
        {fileName ? <span>{fileName}</span> : placeholder}
        <UploadIcon />
        <input
          hidden
          accept="image/*"
          type="file"
          value={value}
          onChange={handleFileSelect}
          required={required}
        />
      </label>
    </>
  );
};

InputImageFile.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  dataOnChange: PropTypes.object.isRequired,
};

export default InputImageFile;

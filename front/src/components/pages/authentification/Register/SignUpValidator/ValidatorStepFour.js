import PropTypes from 'prop-types';

/**
 * Represents the ValidatorStepTwo function.
 * @param {object} formData - An object containing the form data to be validated.
 * @param {object} error - An object containing any errors in the form.
 * @param {function} setError - A function to set the error state.
 * @param {object} errortype - An object containing any errors in the form field types.
 * @param {function} setErrortype - A function to set the errortype state.
 * @returns {boolean} - A boolean value indicating whether the form data is valid or not.
 */
const ValidatorStepFour = (
  formData,
  error,
  setError,
  errortype,
  setErrortype
) => {
  let isValid = true;
  const MAX_FILE_SIZE = 4 * 1000000; // 4MB in bytes

  const areAllFieldsEmpty = () => {
    for (const field in formData) {
      if (formData[field] !== '') {
        return false;
      }
    }
    return true;
  };

  for (const field in formData) {
    if (formData[field] === '') {
      console.log('error');
      setError((prevError) => ({
        ...prevError,
        [field]: true,
      }));
      setErrortype((prevErrortype) => ({
        ...prevErrortype,
        [field]: '*champ de texte requis',
      }));
      isValid = false;
    } else if (formData[field] !== '' && formData[field].size > MAX_FILE_SIZE) {
      setError((prevError) => ({
        ...prevError,
        [field]: true,
      }));
      setErrortype((prevErrortype) => ({
        ...prevErrortype,
        [field]: '*La taille du fichier ne doit pas dépasser 4Mo',
      }));
      isValid = false;
    } else if (formData[field].size < MAX_FILE_SIZE && formData[field] !== '') {
      setError((prevError) => ({
        ...prevError,
        [field]: false,
      }));
      setErrortype((prevErrortype) => ({
        ...prevErrortype,
        [field]: '',
      }));
    }
  }
  return isValid;
};

ValidatorStepFour.propTypes = {
  error: PropTypes.object,
  setError: PropTypes.func,
  errortype: PropTypes.object,
  setErrortype: PropTypes.func,
  formData: PropTypes.object,
};

export default ValidatorStepFour;

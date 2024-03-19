import PropTypes from 'prop-types';
/**
Represents the NewPasswordValidator function.
@param {object} formData - An object containing the form data to be validated.
@param {object} error - An object containing any errors in the form.
@param {function} setError - A function to set the error state.
@param {object} errortype - An object containing any errors in the form field types.
@param {function} setErrorType - A function to set the errortype state.
@returns {boolean} - A boolean value indicating whether the form data is valid or not.



*/

const NewPasswordValidator = (
  formData,
  error,
  setError,
  errortype,
  setErrorType
) => {
  let isValid = true;
  const passwordRegex = /^(?=.*\d).{6,}$/;
  for (const field in formData) {
    if (formData[field] === '') {
      setError((prevError) => ({
        ...prevError,
        [field]: true,
      }));
      setErrorType((prevErrortype) => ({
        ...prevErrortype,
        [field]: '*champ de texte requis',
      }));
      isValid = false;
    } else if (!passwordRegex.test(formData[field])) {
      // charactère spéciaux
      setError((prevError) => ({
        ...prevError,
        password: true,
      }));
      setErrorType((prevErrortype) => ({
        ...prevErrortype,
        password:
          '8 charactères avec un chiffre,Maj, Min et un charactère spécial',
      }));
      isValid = false;
    } else {
      setError((prevError) => ({
        ...prevError,
        [field]: false,
      }));
      setErrorType((prevErrortype) => ({
        ...prevErrortype,
        [field]: '',
      }));
    }
  }

  return isValid;
};

NewPasswordValidator.propTypes = {
  error: PropTypes.object,
  setError: PropTypes.func,
  errortype: PropTypes.object,
  setErrorType: PropTypes.func,
  formData: PropTypes.object,
};

export default NewPasswordValidator;

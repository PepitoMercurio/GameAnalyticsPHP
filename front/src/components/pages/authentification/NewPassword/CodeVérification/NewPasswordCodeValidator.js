import PropTypes from 'prop-types';
import { EmailExist } from '../../../../../utils/API/EmailExist';
/**
Represents the PasswordForgotValidator function.
@param {object} formData - An object containing the form data to be validated.
@param {object} error - An object containing any errors in the form.
@param {function} setError - A function to set the error state.
@param {object} errortype - An object containing any errors in the form field types.
@param {function} setErrortype - A function to set the errortype state.
@returns {boolean} - A boolean value indicating whether the form data is valid or not.
*/
const NewPasswordCodeValidator = async (
  formValue,
  error,
  setError,
  errortype,
  setErrortype
) => {
  let isValid = true;
  const EmailExists = await EmailExist(formValue.email);
  for (const field in formValue) {
    console.log("EMAIL EXIST VALIDATOR : " + EmailExists);
    if (formValue[field] === '') {
      setError((prevError) => ({
        ...prevError,
        [field]: true,
      }));
      setErrortype((prevErrortype) => ({
        ...prevErrortype,
        [field]: '*champ de texte requis',
      }));
      isValid = false;
    } else if (
      field === 'email' &&
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(formValue.email)
    ) {
      setError((prevError) => ({
        ...prevError,
        email: true,
      }));
      setErrortype((prevErrortype) => ({
        ...prevErrortype,
        email: '*adresse email invalide',
      }));
      isValid = false;
    // } else if (field === 'validation' && formValue[field].length !== 6) {
    //   setError((prevError) => ({
    //     ...prevError,
    //     validation: true,
    //   }));
    //   setErrortype((prevErrortype) => ({
    //     ...prevErrortype,
    //     validation: '*Le code de validation doit contenir 6 caractères',
    //   }));
    //   isValid = false;
    // } else if (field === 'validation' && formValue[field] !== '123456') {
    //   setError((prevError) => ({
    //     ...prevError,
    //     validation: true,
    //   }));
    //   setErrortype((prevErrortype) => ({
    //     ...prevErrortype,
    //     validation: 'code invalide',
    //   }));
    //   isValid = false;
    } else if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(formValue.email) && !EmailExist) {
      console.log("EMAIL EXIST PAS");
      setError((prevError) => ({
        ...prevError,
        email: true,
      }));
      setErrortype((prevErrortype) => ({
        ...prevErrortype,
        email: "*l'adresse mail n'est pas associé à un compte",
      }));
      isValid = false;
    } else if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(formValue.email) && EmailExists) {
      console.log("EMAIL EXIST");
      setError((prevError) => ({
        ...prevError,
        [field]: false,
      }));
      setErrortype((prevErrortype) => ({
        ...prevErrortype,
        [field]: '',
      }));
      isValid = true;
    } else {
      console.log("EMAIL EXIST PAS");
      setError((prevError) => ({
        ...prevError,
        email: true,
      }));
      setErrortype((prevErrortype) => ({
        ...prevErrortype,
        email: "*l'adresse mail n'est pas associé à un compte",
      }));
      isValid = false;
    }
  }
  return Promise.resolve(isValid);
};

NewPasswordCodeValidator.propTypes = {
  error: PropTypes.object,
  setError: PropTypes.func,
  errortype: PropTypes.object,
  setErrortype: PropTypes.func,
  formValue: PropTypes.object,
};

export default NewPasswordCodeValidator;

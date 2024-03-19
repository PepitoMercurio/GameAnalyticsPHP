import PropTypes from 'prop-types';
import { EmailExist } from '../../../../../utils/API/EmailExist';

const ValidatorStepOne = async (
  formData,
  error,
  setError,
  errortype,
  setErrortype
) => {
  const validateEmail = async (email) => {
    const emailExists = await EmailExist(email);
    if (emailExists) {
      setError((prevError) => ({
        ...prevError,
        email: true,
      }));
      setErrortype((prevErrortype) => ({
        ...prevErrortype,
        email: '*un compte existe déjà avec cet email',
      }));
      return false;
    } else {
      setError((prevError) => ({
        ...prevError,
        email: false,
      }));
      setErrortype((prevErrortype) => ({
        ...prevErrortype,
        email: '',
      }));
      return true;
    }
  };

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
  const passwordRegex = /^(?=.*\d).{6,}$/;
  let isValid = true;
  let emailValidationResult = null;

  for (const field in formData) {
    if (formData[field] === '') {
      setError((prevError) => ({
        ...prevError,
        [field]: true,
      }));
      setErrortype((prevErrortype) => ({
        ...prevErrortype,
        [field]: '*champ de texte requis',
      }));
      isValid = false;
    } else {
      setError((prevError) => ({
        ...prevError,
        [field]: false,
      }));
      setErrortype((prevErrortype) => ({
        ...prevErrortype,
        [field]: '',
      }));
    }

    if (
      field === 'password' &&
      formData[field] !== '' &&
      !passwordRegex.test(formData[field])
    ) {
      setError((prevError) => ({
        ...prevError,
        [field]: true,
      }));
      setErrortype((prevErrortype) => ({
        ...prevErrortype,
        [field]: '*lettres et chiffres minimum 6 caractères',
      }));
      isValid = false;
    } else if (
      field === 'email' &&
      formData[field] !== '' &&
      !emailRegex.test(formData[field])
    ) {
      setError((prevError) => ({
        ...prevError,
        [field]: true,
      }));
      setErrortype((prevErrortype) => ({
        ...prevErrortype,
        [field]: '*adresse email invalide',
      }));
      isValid = false;
    } else if (
      field === 'email' &&
      formData[field] !== '' &&
      emailRegex.test(formData[field])
    ) {
      try {
        emailValidationResult = await validateEmail(formData[field]);
        if (!emailValidationResult) {
          isValid = false;
        }
      } catch (error) {
        console.error(error);
        return Promise.reject(error); // Rejeter la promesse en cas d'erreur
      }
    }
  }

  if (
    isValid &&
    formData.email !== '' &&
    formData.password !== '' &&
    formData.confirmPassword !== '' &&
    emailValidationResult &&
    passwordRegex.test(formData.password)
  ) {
    isValid = true;
  }

  return Promise.resolve(isValid);
};

ValidatorStepOne.propTypes = {
  error: PropTypes.object,
  setError: PropTypes.func,
  errortype: PropTypes.object,
  setErrortype: PropTypes.func,
  formData: PropTypes.object,
};

export default ValidatorStepOne;

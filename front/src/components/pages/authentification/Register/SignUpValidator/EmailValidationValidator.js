import PropTypes from 'prop-types';
import { VerificationEmailCode } from '../../../../../utils/API/User_API/VerificationEmailCode';
import { API_PATH } from '../../../../../constants/API_ROUTES';

const EmailValidationValidator = async (
  formData,
  error,
  setError,
  errortype,
  setErrortype
) => {
  const validateField = async (field, value) => {
    let isValid = true;

    if (value === '') {
      setError((prevError) => ({
        ...prevError,
        [field]: true,
      }));
      setErrortype((prevErrortype) => ({
        ...prevErrortype,
        [field]: '*champ de texte requis',
      }));
      isValid = false;
    } else if (value.length !== 6) {
      setError((prevError) => ({
        ...prevError,
        [field]: true,
      }));
      setErrortype((prevErrortype) => ({
        ...prevErrortype,
        [field]: '*le code doit être de 6 caractères',
      }));
      isValid = false;
    } else {
      try {
        const isCodeRight = await VerificationEmailCode(
          API_PATH.AUTHENTIFICATION.EMAIL_CODE_VALIDATION.PATH,
          value
        );
        if (!isCodeRight) {
          setError((prevError) => ({
            ...prevError,
            [field]: true,
          }));
          setErrortype((prevErrortype) => ({
            ...prevErrortype,
            [field]: 'mauvais mot de passe',
          }));
          isValid = false;
        }
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    }

    return isValid;
  };

  let isValid = true;

  for (const field in formData) {
    const value = formData[field];
    const isFieldValid = await validateField(field, value);
    if (!isFieldValid) {
      isValid = false;
    }
  }

  if (isValid && formData.code.length < 6) {
    setError((prevError) => ({
      ...prevError,
      code: true,
    }));
    setErrortype((prevErrortype) => ({
      ...prevErrortype,
      code: '*le code doit être de 6 caractères',
    }));
    isValid = false;
  }

  return Promise.resolve(isValid);
};

EmailValidationValidator.propTypes = {
  error: PropTypes.object,
  setError: PropTypes.func,
  errortype: PropTypes.object,
  setErrortype: PropTypes.func,
  formData: PropTypes.object,
};

export default EmailValidationValidator;

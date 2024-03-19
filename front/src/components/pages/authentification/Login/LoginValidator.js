import PropTypes from 'prop-types';
import { LoginAuthentification } from '../../../../utils/API/User_API/LoginAuthentification';
import { API_PATH } from '../../../../constants/API_ROUTES';

const LoginValidator = async (
  formValue,
  error,
  setError,
  errortype,
  setErrortype
) => {
  const existingToken = localStorage.getItem('token');
  const existingid = localStorage.getItem('id');
  const existinglogin = localStorage.getItem('login');

  if (existingToken) {
    console.log('token removed');
    localStorage.removeItem('token');
  }

  if (existingid) {
    console.log('id removed');
    localStorage.removeItem('id');
  }

  if (existinglogin) {
    console.log('login removed');
    localStorage.removeItem('login');
  }

  const result = await LoginAuthentification(
    API_PATH.AUTHENTIFICATION.LOGIN.PATH,
    formValue
  );
  const { success, token, id } = result;

  console.log('success : ' + success);

  let IsValid = true;
  for (const field in formValue) {
    if (formValue[field] === '') {
      setError((prevError) => ({
        ...prevError,
        [field]: true,
      }));
      setErrortype((prevErrortype) => ({
        ...prevErrortype,
        [field]: '*champ de texte requis',
      }));
      IsValid = false;
    } else if (!success) {
      setError((prevError) => ({
        ...prevError,
        [field]: true,
      }));
      setErrortype((prevErrortype) => ({
        ...prevErrortype,
        ['email']: 'Mot de passe ou Email faux',
      }));
      IsValid = false;
    } else {
      setError((prevError) => ({
        ...prevError,
        [field]: false,
      }));
      setErrortype((prevErrortype) => ({
        ...prevErrortype,
        [field]: '',
      }));
      IsValid = true;
      localStorage.setItem('token', token);
      localStorage.setItem('id', id);
      console.log('token : ' + token);
      console.log('id : ' + id);
      console.log('Connected');
      localStorage.setItem('login', true);
    }
  }

  return Promise.resolve(IsValid);
};

export default LoginValidator;

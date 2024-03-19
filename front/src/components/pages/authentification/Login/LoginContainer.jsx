import { React, useState } from 'react';
import LoginComponent from './LoginComponent';
import { HandleChange } from '../../../../utils/HandleChange';
import LoginValidator from './LoginValidator';
import { ROUTES } from '../../../../constants/routesConst';
import { API_PATH } from '../../../../constants/API_ROUTES';
import { FetchUserData } from '../../../../utils/API/User_API/FetchUserData';

// ...

const LoginContainer = () => {
  const [error, setError] = useState({
    email: false,
    password: false,
  });
  const [errortype, setErrortype] = useState({
    email: '',
    password: '',
  });
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const HandleSubmit = async (event) => {
    console.log(error);
    event.preventDefault();
    try {
      if (
        await LoginValidator(
          formValue,
          error,
          setError,
          errortype,
          setErrortype
        )
      ) {
        console.log('entré dans le site');
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');

        window.location.href = ROUTES.HOME.PATH;
      } else {
        // localStorage.setItem('login', false)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoginComponent
      handleChange={HandleChange}
      formValue={formValue}
      setFormValue={setFormValue}
      HandleSubmit={HandleSubmit}
      error={error}
      setError={setError}
      errortype={errortype}
      setErrortype={setErrortype}
    />
  );
};

export default LoginContainer;

import { React, useState } from 'react';
import { HandleChange } from '../../../../utils/HandleChange.js';
import NewPasswordCodeValidator from './CodeVérification/NewPasswordCodeValidator.js';
import Success from './NewPassword/Success.jsx';
import NewPasswordValidator from './NewPassword/NewPasswordValidator.js';
import NewPasswordCodeComponent from './CodeVérification/NewPasswordCodeComponent.jsx';
import NewPasswordComponent from './NewPassword/NewPasswordComponent.jsx';
import NewPasswordEmailComponent from './NewPasswordEmailComponent.jsx';
import { NewPassword } from '../../../../utils/API/User_API/NewPassword.js';
import { API_PATH } from '../../../../constants/API_ROUTES.js';

/**
 * A container component that handles the state and functions for the PasswordForgotComponent
 * @return {JSX.Element} Returns the PasswordForgotComponent with the props required to handle form data
 */
const PasswordForgotContainer = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [stepOneCompleted, setStepOneCompleted] = useState(false);
  const [FormSuccess, setFormSuccess] = useState(false);
  const [error, setError] = useState({
    password: false,
    email: false,
    validation: false,
  });
  const [errortype, setErrortype] = useState({
    password: '',
    email: '',
    validation: '',
  });
  const [formValue, setFormValue] = useState({
    password: '',
    email: '',
  });

  const { email } = formValue;
  const { password } = formValue;
  const formDataStepOne = { email };
  const formDataStepThree = { password };

  const HandleSubmit = async (event) => {
    event.preventDefault();
    console.log(formValue);
    if (formSubmitted === false) {
      try {
        if (
          await NewPasswordCodeValidator(
            formDataStepOne,
            error,
            setError,
            errortype,
            setError
          )
        ) {
          setFormSubmitted(true);
        }
      } catch {
        console.error(error);
      }
    } else {


         try {
        if (
          await NewPasswordValidator(
            formDataStepThree,
            error,
            setError,
            errortype,
            setError
          )
        ) {
           setFormSuccess(true);
           console.log('bon')
           NewPassword(API_PATH.AUTHENTIFICATION.NEW_PASSWORD.PATH,formValue);
        }
      } catch {
        console.error(error);
      }
      }
    
  };

  return (
    <>
      {formSubmitted ? (
          FormSuccess ? (
            <Success />
          ) : (
            <NewPasswordComponent //password creation
              handleChange={HandleChange}
              formValue={formValue}
              setFormValue={setFormValue}
              HandleSubmit={HandleSubmit}
              error={error}
              setError={setError}
              errortype={errortype}
              setErrortype={setErrortype}
            />
          )
        
      ) : (
        <NewPasswordEmailComponent //email
          handleChange={HandleChange}
          formValue={formValue}
          setFormValue={setFormValue}
          HandleSubmit={HandleSubmit}
          error={error}
          setError={setError}
          errortype={errortype}
          setErrortype={setErrortype}
        />
      )}
    </>
  );
};

export default PasswordForgotContainer;

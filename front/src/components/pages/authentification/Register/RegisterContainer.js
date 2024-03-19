import { React, useState } from 'react';
import ComponentList from './ComponentList/ComponentList';
import EmailValidationValidator from './SignUpValidator/EmailValidationValidator';
import ValidatorStepOne from './SignUpValidator/ValidatorStepOne.js';
import ValidatorStepFour from './SignUpValidator/ValidatorStepFour.js';
import { API_PATH } from '../../../../constants/API_ROUTES';
import { CreateAccount } from '../../../../utils/API/User_API/CreateAccount';
import { PhpMailer } from '../../../../utils/API/PhpMailer';

const RegisterContainer = () => {
  const [error, setError] = useState({
    name: false,
    surname: false,
    pseudo: false,
    email: false,
    password: false,
    logo: false,
    banner: false,
    code: false,
  });
  const [errortype, setErrortype] = useState({
    name: '',
    surname: '',
    pseudo: '',
    email: '',
    password: '',
    logo: '',
    banner: '',
    code: '',
  });
  const [formValue, setFormValue] = useState({
    name: '',
    surname: '',
    pseudo: '',
    email: '',
    password: '',
    logo: '',
    banner: '',
    code: '',
  });
  const [page, setPage] = useState(0);
  const HandleSubmit = async (event) => {
    event.preventDefault();
    console.log({ page: page });
    const { name, surname, pseudo, email, password } = formValue;
    const { logo, banner } = formValue;
    const { code } = formValue;
    const formDataStepOne = { name, surname, pseudo, email, password };
    const formDataStepFour = { logo, banner };
    const formDataStepFive = { code };

    switch (page) {
      case 0:
        try {
          if (
            await ValidatorStepOne(
              formDataStepOne,
              error,
              setError,
              errortype,
              setErrortype
            )
          ) {
            setPage((page) => page + 1);
            PhpMailer(
              API_PATH.AUTHENTIFICATION.EMAIL_CODE_VALIDATION.PATH,
              formDataStepOne.email
            );
          } else {
            setPage((page) => page);
          }
        } catch (error) {
          console.error(error);
        }
        break;
      case 1:
        if (
          ValidatorStepFour(
            formDataStepFour,
            error,
            setError,
            errortype,
            setErrortype
          )
        ) {
          setPage((page) => page + 1);
        } else {
          setPage((page) => page);
        }
        break;
      case 2:
        try {
          if (
            await EmailValidationValidator(
              formDataStepFive,
              error,
              setError,
              errortype,
              setErrortype
            )
          ) {
            console.log('TOUT EST BON');
            console.log(formValue);
            const formData = new FormData();
            formData.append('name', formValue.name);
            formData.append('surname', formValue.surname);
            formData.append('pseudo', formValue.pseudo);
            formData.append('email', formValue.email);
            formData.append('password', formValue.password);
            formData.append('logo', formValue.logo);
            formData.append('banner', formValue.banner);
            formData.append('code', formValue.code);
            const NewAccount = CreateAccount(
              API_PATH.AUTHENTIFICATION.CREATE_ACCOUNT.PATH,
              formData
            );
            if (NewAccount) {
              console.log('compte créee');
            } else {
              console.log('erreur');
            }
            setPage((page) => page + 1);
            console.log({ page: page });
          } else {
            setPage((page) => page);
          }
        } catch (error) {
          console.error(error);
        }
        break;
      default:
        setPage((page) => page);
    }
  };

  const SignupComponentList = ComponentList({
    setFormValue,
    formValue,
    HandleSubmit,
    page,
    setPage,
    error,
    setError,
    errortype,
    setErrortype,
  });
  return <div>{SignupComponentList[page]}</div>;
};
export default RegisterContainer;

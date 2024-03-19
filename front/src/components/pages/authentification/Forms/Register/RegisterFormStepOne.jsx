import React from 'react';
import Input from '../../../../elements/input/Input';
import { INPUT } from '../../../../../constants/inputConst';
import Button from '../../../../elements/button/Button';

const RegisterFormStepOne = ({
  formValue,
  setFormValue,
  handleChange,
  HandleSubmit,
  className,
  name,
  error,
  setError,
  errortype,
  setErrortype,
  HorizontalLabelPositionBelowStepper,
}) => {
  return (
    <>
      <form
        name={name}
        className={className}
        onSubmit={HandleSubmit}
        noValidate
      >
        <Input
          required={true}
          name={!error.name ? 'input' : 'input-error'}
          type="text"
          dataOnChange={{
            state: formValue,
            setState: setFormValue,
            name: INPUT.SIGN_UP.PERSONAL_INFO.NAME.NAME,
          }}
          value={formValue.name}
          onChange={handleChange}
          placeholder="Nom"
        />
        {error.name ? (
          <label className="card__error">{errortype.name}</label>
        ) : (
          ''
        )}
        <Input
          required={true}
          name={!error.surname ? 'input' : 'input-error'}
          type="text"
          value={formValue.surname}
          dataOnChange={{
            state: formValue,
            setState: setFormValue,
            name: INPUT.SIGN_UP.PERSONAL_INFO.SURNAME.NAME,
          }}
          onChange={handleChange}
          placeholder="Prénom"
        />
        {error.surname ? (
          <label className="card__error">{errortype.surname}</label>
        ) : (
          ''
        )}
        <Input
          required={false}
          name={!error.pseudo ? 'input' : 'input-error'}
          type="text"
          value={formValue.pseudo}
          dataOnChange={{
            state: formValue,
            setState: setFormValue,
            name: INPUT.SIGN_UP.PERSONAL_INFO.PSEUDO.NAME,
          }}
          onChange={handleChange}
          placeholder="Pseudo"
        />
        {error.pseudo ? (
          <label className="card__error">{errortype.pseudo}</label>
        ) : (
          ''
        )}

        <Input
          required={true}
          name={!error.email ? 'input' : 'input-error'}
          type="email"
          value={formValue.email}
          dataOnChange={{
            state: formValue,
            setState: setFormValue,
            name: INPUT.SIGN_UP.PERSONAL_INFO.EMAIL.NAME,
          }}
          onChange={handleChange}
          placeholder="Adresse mail"
        />
        {error.email ? (
          <label className="card__error">{errortype.email}</label>
        ) : (
          ''
        )}
        <Input
          required={true}
          name={!error.password ? 'input' : 'input-error'}
          type={'password'}
          value={formValue.password}
          dataOnChange={{
            state: formValue,
            setState: setFormValue,
            name: INPUT.SIGN_UP.PERSONAL_INFO.PASSWORD.NAME,
          }}
          onChange={handleChange}
          placeholder="Mot de passe "
        />

        {error.password ? (
          <label className="card__error">{errortype.password}</label>
        ) : (
          <label className="card__label-input-password">
            *au moins 8 charactères dont un chiffre, une lettre Maj et Min
          </label>
        )}
        <Button
          className="card__form-submit"
          name="Passer à l'étape suivante"
        ></Button>
      </form>
    </>
  );
};

export default RegisterFormStepOne;

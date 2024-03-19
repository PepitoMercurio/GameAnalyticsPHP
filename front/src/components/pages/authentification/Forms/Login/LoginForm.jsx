import React from 'react';
import Input from '../../../../elements/input/Input';
import { INPUT } from '../../../../../constants/inputConst';
import PropTypes from 'prop-types';
import Button from '../../../../elements/button/Button';
const LoginForm = ({
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
          name={!error.email ? 'input' : 'input-error'}
          type="email"
          dataOnChange={{
            state: formValue,
            setState: setFormValue,
            name: INPUT.SIGN_IN.EMAIL.NAME,
          }}
          value={formValue.email}
          onChange={handleChange}
          placeholder="Addresse Email"
        />
        {error.email ? (
          <label className="card__error">{errortype.email}</label>
        ) : (
          ''
        )}

        <Input
          required={true}
          name={!error.password ? 'input' : 'input-error'}
          type="password"
          dataOnChange={{
            state: formValue,
            setState: setFormValue,
            name: INPUT.SIGN_IN.PASSWORD.NAME,
          }}
          value={formValue.password}
          onChange={handleChange}
          placeholder="Mot de passe"
        />

        {error.password ? (
          <label className="card__error">{errortype.password}</label>
        ) : (
          ''
        )}

        <Button className="card__form-submit" name="Se connecter"></Button>
      </form>
    </>
  );
};

LoginForm.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  HandleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  formValue: PropTypes.object,
  setFormValue: PropTypes.func,
  error: PropTypes.object,
  setError: PropTypes.func,
  errortype: PropTypes.object,
  setErrortype: PropTypes.func,
};

export default LoginForm;

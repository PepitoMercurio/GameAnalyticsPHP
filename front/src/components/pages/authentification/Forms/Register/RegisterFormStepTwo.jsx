import React from 'react';
import PropTypes from 'prop-types';
import InputImageFile from '../../../../elements/input/inputImageFile';
import Input from '../../../../elements/input/Input';
import { INPUT } from '../../../../../constants/inputConst';
import Button from '../../../../elements/button/Button';

/**

A component that renders the fourth step of the sign-up form which allows the user to upload their logo and banner.
@component
@param {Object} props - The props that are passed to this component.
@param {string} [props.name] - The name of the form.
@param {string} [props.className] - The CSS class to be applied to the form.
@param {function} props.HandleSubmit - The function that handles form submission.
@param {function} props.handleChange - The function that handles input field changes.
@param {Object} props.formValue - An object that contains the form values.
@param {function} props.setFormValue - The function that sets the form value.
@param {Object} props.error - An object that contains the form errors.
@param {function} props.setError - The function that sets the form error.
@param {Object} props.errortype - An object that contains the form error types.
@param {function} props.setErrortype - The function that sets the form error types.
@param {boolean} [props.required] - Whether the input is required or not.
@return {JSX.Element}
*/

const RegisterFormStepTwo = ({
  required,
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
  console.log(formValue);
  return (
    <>
      <form className={className} onSubmit={HandleSubmit} noValidate>
        <InputImageFile
          required={false}
          classname={!error.logo ? 'input-image' : 'input-image__error'}
          dataOnChange={{
            state: formValue,
            setState: setFormValue,
            name: INPUT.SIGN_UP.LOGO.LOGO.NAME,
          }}
          value={formValue.logo.object}
          onChange={handleChange}
          placeholder="Upload votre logo"
        />
        {error.logo ? (
          <label className="card__error--logo">{errortype.logo}</label>
        ) : (
          ''
        )}

        <InputImageFile
          required={false}
          classname={!error.banner ? 'input-image' : 'input-image__error'}
          value={formValue.banner.object}
          dataOnChange={{
            state: formValue,
            setState: setFormValue,
            name: INPUT.SIGN_UP.LOGO.BANNER.NAME,
          }}
          onChange={handleChange}
          placeholder="Upload votre bannière"
        />

        {error.banner ? (
          <label className="card__error--logo">{errortype.banner}</label>
        ) : (
          ''
        )}

        <Button
          className="card__form-submit"
          name="Passer à l'étape suivante"
        />
      </form>
    </>
  );
};

RegisterFormStepTwo.propTypes = {
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
  required: PropTypes.bool,
};

export default RegisterFormStepTwo;

import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../../../elements/input/Input';
import { INPUT } from '../../../../../constants/inputConst';
import Button from '../../../../elements/button/Button';
/**
 * A form for email validation.
 @param {object} props - The props object.
 @param {string} name - The name of the form.
 @param {string} className - The class name for the form.
 @param {function} HandleSubmit - The callback function to handle form submission.
 @param {function} handleChange - The callback function to handle form field changes.
 @param {object} formValue - The current form values.
 @param {function} setFormValue - The function to set form values.
 @param {object} error - The current form errors.
 @param {function} setError - The function to set form errors.
 @param {object} errortype - The error messages for each form field.
 @param {function} setErrortype - The function to set error messages.
 @returns {JSX.Element} - The EmailValidationForm component.
 */
const EmailValidationForm = ({
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
          className="card__form-code"
          required={true}
          name={!error.code ? 'input' : 'input-error'}
          type="text"
          dataOnChange={{
            state: formValue,
            setState: setFormValue,
            name: INPUT.VALIDATION.CODE.NAME,
          }}
          value={formValue.code}
          onChange={handleChange}
          placeholder="Code à 6 chiffres"
        />
        {error.code ? (
          <label className="card__error">{errortype.code}</label>
        ) : (
          ''
        )}

        <Button
          className="card__form-submit"
          name="Valider l’inscription"
        ></Button>
      </form>
    </>
  );
};

EmailValidationForm.propTypes = {
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

export default EmailValidationForm;

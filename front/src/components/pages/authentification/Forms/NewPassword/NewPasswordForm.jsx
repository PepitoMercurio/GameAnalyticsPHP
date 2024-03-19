import Input from '../../../../elements/input/Input';
import { INPUT } from '../../../../../constants/inputConst';
import Button from '../../../../elements/button/Button';

import React from 'react';
import PropTypes from 'prop-types';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
/**
 * A React functional component for rendering a new password form
 @param {Object} props - The props object containing the formValue, setFormValue, handleChange, HandleSubmit, className, and name props.
 @param {Object} formValue - An object containing the values of the new password form fields.
 @param {function} setFormValue - The function to be called when updating the values of the new password form fields.
 @param {function} handleChange - The function to be called when a new password form field value changes.
 @param {function} HandleSubmit - The function to be called when the new password form is submitted.
 @param {string} className - The CSS class(es) to be applied to the new password form.
 @param {string} name - The name of the new password form.
 @param {Object} error - An object containing error messages for the new password form fields.
 @returns {JSX.Element} - A new password form with a code input field and a submit button.
 */

const NewPasswordForm = ({
  formValue,
  setFormValue,
  handleChange,
  HandleSubmit,
  className,
  name,
  error,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const handleVisibilityToggle = () => {
    setIsVisible(!isVisible);
  };
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
          name={!error.password ? 'input' : 'input-error'}
          type={isVisible ? 'text' : 'password'}
          value={formValue.password}
          dataOnChange={{
            state: formValue,
            setState: setFormValue,
            name: INPUT.PASSWORD_FORGOT.NEW_PASSWORD.NAME,
          }}
          onChange={handleChange}
          placeholder="Nouveau mot de passe"
          childrenOnClick={handleVisibilityToggle}
        >
          {isVisible ? (
            <VisibilityOutlinedIcon />
          ) : (
            <VisibilityOffOutlinedIcon />
          )}
        </Input>
        {error.password ? (
          <label className="card__error">{error.password}</label>
        ) : (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label className="card__label-newpassword">
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

NewPasswordForm.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  HandleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  formValue: PropTypes.object,
  setFormValue: PropTypes.func,
  error: PropTypes.object,
};

export default NewPasswordForm;

import RegisterComponentStepOne from '../RegisterComponent/RegisterComponentStepOne';
import { HandleChange } from '../../../../../utils/HandleChange';
import RegisterComponentStepTwo from '../RegisterComponent/RegisterComponentStepTwo';
import PropTypes from 'prop-types';
import Succes from '../Succes';
import EmailValidationComponent from '../RegisterComponent/EmailValidationComponent.jsx';

/**

ComponentList is a functional component that renders a list of child components used for a multi-step sign-up form.
@param {Object} props - The component props
@param {function} props.setFormValue - A function that sets the value of the form fields
@param {Object} props.formValue - An object that contains the current value of the form fields
@param {function} props.HandleSubmit - A function that handles the form submission
@param {function} props.handleChange - A function that handles the form input changes
@param {number} props.page - The current page number of the multi-step form
@param {function} props.setPage - A function that sets the current page number of the multi-step form
@param {function} props.HorizontalLabelPositionBelowStepper - A function that sets the horizontal label position below stepper
@param {Object} props.error - An object that contains the current error state of the form fields
@param {function} props.setError - A function that sets the error state of the form fields
@param {Object} props.errortype - An object that contains the current error type of the form fields
@param {function} props.setErrortype - A function that sets the error type of the form fields
@returns {Array} An array of child components to render
*/
const ComponentList = ({
  setFormValue,
  formValue,
  HandleSubmit,
  page,
  setPage,
  error,
  setError,
  errortype,
  setErrortype,
}) => [
  <RegisterComponentStepOne
    page={page}
    setPage={setPage}
    handleChange={HandleChange}
    formValue={formValue}
    setFormValue={setFormValue}
    HandleSubmit={HandleSubmit}
    error={error}
    setError={setError}
    errortype={errortype}
    setErrortype={setErrortype}
  />,
  <RegisterComponentStepTwo
    page={page}
    setPage={setPage}
    handleChange={HandleChange}
    formValue={formValue}
    setFormValue={setFormValue}
    HandleSubmit={HandleSubmit}
    error={error}
    setError={setError}
    errortype={errortype}
    setErrortype={setErrortype}
  />,
  <EmailValidationComponent
    page={page}
    setPage={setPage}
    handleChange={HandleChange}
    formValue={formValue}
    setFormValue={setFormValue}
    HandleSubmit={HandleSubmit}
    error={error}
    setError={setError}
    errortype={errortype}
    setErrortype={setErrortype}
  />,
  <Succes data={formValue} />,
];

ComponentList.propTypes = {
  HandleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  HandleChangeFile: PropTypes.func,
  formValue: PropTypes.object,
  setFormValue: PropTypes.func,
  HorizontalLabelPositionBelowStepper: PropTypes.func,
  error: PropTypes.object,
  setError: PropTypes.func,
  errortype: PropTypes.object,
  setErrortype: PropTypes.func,
};

export default ComponentList;

import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../../constants/routesConst';
import { Grid } from '@mui/material';
import RegisterFormStepOne from '../../Forms/Register/RegisterFormStepOne';
import Layout from '../../../../elements/layout/Layout';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import styles from '../../../../../assets-style/scss/components/header/Header.module.scss';
import CustomizedSteppers from '../Stepper';

const RegisterComponentStepOne = ({
  setFormValue,
  formValue,
  HandleSubmit,
  handleChange,
  page,
  error,
  setError,
  errortype,
  setErrortype,
}) => {
  return (
    <>
      <Grid className="page__auth">
        <Grid
          style={{ position: 'absolute', color: 'white' }}
          className="card__header"
        >
          <a
            style={{ color: '' }}
            href={ROUTES.HOME.PATH}
            className={styles.logo}
          >
            <SportsVolleyballIcon
              style={{
                fontSize: '45px',
                marginRight: '10px',
                marginBottom: '5px',
                verticalAlign: 'middle',
                color: 'white',
              }}
            />
            Zindar
          </a>
        </Grid>

        <Grid className="page__auth__left">
          <Grid className="card">
            <Grid className="card__title">
              <strong>Inscription</strong>
            </Grid>
            <Grid className="card__stepper">
              <CustomizedSteppers page={page} />
            </Grid>

            <Grid className="card__no-account">
              <p className="card__text">Déja inscris ?</p>
              <Link
                className="card__link-registration"
                to={ROUTES.AUTHENTIFICATION.SIGN_IN.PATH}
              >
                {''}
                Connectez-vous{' '}
              </Link>
            </Grid>

            <RegisterFormStepOne
              formValue={formValue}
              setFormValue={setFormValue}
              handleChange={handleChange}
              className={'card__form'}
              name={'form'}
              HandleSubmit={HandleSubmit}
              error={error}
              setError={setError}
              errortype={errortype}
              setErrortype={setErrortype}
            />

            <Link
              className="card__forgot-password"
              to={ROUTES.AUTHENTIFICATION.NEW_PASSWORD.PATH}
            >
              -
            </Link>
          </Grid>
        </Grid>

        <Grid className="page__auth__right">
          <Layout />
        </Grid>
      </Grid>
    </>
  );
};

export default RegisterComponentStepOne;

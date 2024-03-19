import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../../constants/routesConst';
import { Grid } from '@mui/material';
import RegisterFormStepOne from '../../Forms/Register/RegisterFormStepOne';
import Layout from '../../../../elements/layout/Layout';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import styles from '../../../../../assets-style/scss/components/header/Header.module.scss';
import NewPasswordCodeForm from '../../Forms/NewPassword/NewPasswordCodeForm';

const NewPasswordCodeComponent = ({
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
              <strong>Code Verification</strong>
            </Grid>
            <Grid className="card__stepper">
              Un code vous a été envoyé sur votre adresse mail
            </Grid>

            <Grid className="card__no-account">
              <p className="card__text">Veuillez renseigner le code </p>
            </Grid>

            <NewPasswordCodeForm
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

            <Grid className="card__forgot">
              <p className="card__text">Vous n'avez pas de compte ?</p>
              <Link
                className="card__link-registration"
                to={ROUTES.AUTHENTIFICATION.SIGN_UP.PATH}
              >
                {''}
                Inscrivez-vous{' '}
              </Link>
            </Grid>
          </Grid>
        </Grid>

        <Grid className="page__auth__right">
          <Layout />
        </Grid>
      </Grid>
    </>
  );
};

export default NewPasswordCodeComponent;

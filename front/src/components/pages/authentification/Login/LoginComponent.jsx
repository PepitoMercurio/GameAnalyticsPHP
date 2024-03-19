import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routesConst';
import LoginForm from '../Forms/Login/LoginForm';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import Layout from '../../../elements/layout/Layout';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import styles from '../../../../assets-style/scss/components/header/Header.module.scss';

const LoginComponent = ({
  setFormValue,
  formValue,
  HandleSubmit,
  handleChange,
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
              <strong>Se Connecter</strong>
            </Grid>
            <Grid className="card__no-account">
              <p className="card__text">Vous n'avez pas de compte ?</p>
              <Link
                className="card__link-registration"
                to={ROUTES.AUTHENTIFICATION.SIGN_UP.PATH}
              >
                {''}
                Inscrivez-vous{' '}
              </Link>
            </Grid>

            <LoginForm
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
              Mot de passe oublié ?
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

LoginComponent.propTypes = {
  HandleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  formValue: PropTypes.object,
  setFormValue: PropTypes.func,
  error: PropTypes.object,
  setError: PropTypes.func,
  errortype: PropTypes.object,
  setErrortype: PropTypes.func,
};

export default LoginComponent;

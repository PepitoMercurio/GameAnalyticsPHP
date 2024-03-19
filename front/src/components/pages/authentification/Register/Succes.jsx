import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ROUTES } from '../../../../constants/routesConst';
import { Grid } from '@mui/material';
import Layout from '../../../elements/layout/Layout';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import styles from '../../../../assets-style/scss/components/header/Header.module.scss';
/**
 * A component that displays a success message after a user account has been created
 *
 * @component
 */
const Succes = (data) => {
  console.log(data);
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
            <Grid className="card__title">Compte Créé</Grid>

            <Grid className="card__no-account">
              <p className="card__text">
                Félicitations votre compte est maintenant créé{' '}
              </p>
            </Grid>

            <Link
              className="card__forgot-password"
              to={ROUTES.AUTHENTIFICATION.SIGN_IN.PATH}
            >
              Connectez-vous <HowToRegIcon />
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

Succes.propTypes = {
  HandleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  formValue: PropTypes.object,
  setFormValue: PropTypes.func,
};

export default Succes;

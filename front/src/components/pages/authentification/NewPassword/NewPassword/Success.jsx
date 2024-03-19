import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../../constants/routesConst';
import { Grid } from '@mui/material';
import RegisterFormStepOne from '../../Forms/Register/RegisterFormStepOne';
import Layout from '../../../../elements/layout/Layout';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import styles from '../../../../../assets-style/scss/components/header/Header.module.scss';
import NewPasswordForm from '../../Forms/NewPassword/NewPasswordEmailForm';

const Success = () => {
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
              <strong>Félicitation</strong>
            </Grid>
            <Grid className="card__stepper">
              Votre mot de passe a bien été mis-a-jour
            </Grid>

            <Grid className="card__no-account"></Grid>

            <Link
              className="card__forgot-password"
              to={ROUTES.AUTHENTIFICATION.SIGN_IN.PATH}
            >
              Connectez-vous
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

export default Success;

import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '../../elements/card/Card';
import Header from '../../elements/header/Header';
import { Grid } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import { ROUTES } from '../../../constants/routesConst';

const HomeComponent = () => {
  const Login = Boolean(localStorage.getItem('login'));
  if (!Login) {
    window.location.href = ROUTES.AUTHENTIFICATION.SIGN_IN.PATH;
  }
  const [loading, setLoading] = useState(true);
  const [accountComponent, setAccountComponent] = useState(null);

  useEffect(() => {
    const fetchAccountComponent = async () => {
      try {
        const AccountModule = await import('../../elements/account/Account');
        const AccountComponent = await AccountModule.default({
          className: 'page__account',
          friends: '',
        });
        setAccountComponent(AccountComponent);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching account component:', error);
      }
    };

    fetchAccountComponent();
  }, []);

  return (
    <>
      {loading ? (
        <Backdrop open>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Grid className="page">
          <Header Connected={Login} />
          {/* <SideMenu/> */}
          {accountComponent}
          
        </Grid>
      )}
    </>
  );
};

export default HomeComponent;

import React, { useState, useEffect } from 'react';
import Header from '../../elements/header/Header';
import { Grid } from '@material-ui/core';
import ArticleCard from '../../elements/card/ArticleCard';
import { ROUTES } from '../../../constants/routesConst';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

const ArticleComponent = () => {
  const Login = Boolean(localStorage.getItem('login'));
  if (!Login) {
    window.location.href = ROUTES.AUTHENTIFICATION.SIGN_IN.PATH;
  }
  const [loading, setLoading] = useState(true);
  const [accountComponent, setAccountComponent] = useState(null);

  useEffect(() => {
    const fetchAccountComponent = async () => {
      try {
        const ArticleCard = await import('../../elements/card/ArticleCard');
        const AccountComponent = await ArticleCard.default({
          className: 'page__account',
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

          <div style={{ marginTop: '6%' }}>
            {' '}
            {/* Adjust the margin top as per your header's height */}
            {accountComponent}
          </div>
        </Grid>
      )}
    </>
  );
};

export default ArticleComponent;

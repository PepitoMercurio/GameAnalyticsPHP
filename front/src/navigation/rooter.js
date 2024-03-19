import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeComponent from '../components/pages/home/HomeComponent';
import LoginContainer from '../components/pages/authentification/Login/LoginContainer';
import RegisterContainer from '../components/pages/authentification/Register/RegisterContainer';
import NewPasswordContainer from '../components/pages/authentification/NewPassword/NewPasswordContainer';
import ChatGeneralContainer from '../components/pages/messages/ChatGeneralContainer';
import ArticleComponent from '../components/pages/articles/ArticleComponent';
import { PrivateMessage } from '../components/pages/messages/PrivateMessage';
import { ROUTES } from '../constants/routesConst';

const Rooter = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route
          index
          exact
          path={ROUTES.MESSAGE.PATH}
          element={<PrivateMessage />}
        />
        <Route
          index
          exact
          path={ROUTES.HOME.PATH}
          element={<HomeComponent />}
        />
     
        <Route
          index
          exact
          path={ROUTES.CHAT.PATH}
          element={<ChatGeneralContainer />}
        />
        <Route
          index
          exact
          path={ROUTES.ARTICLE.PATH}
          element={<ArticleComponent />}
        />
        <Route
          index
          exact
          path={ROUTES.AUTHENTIFICATION.SIGN_IN.PATH}
          element={<LoginContainer />}
        />
        <Route
          index
          exact
          path={ROUTES.AUTHENTIFICATION.SIGN_UP.PATH}
          element={<RegisterContainer />}
        />
        <Route
          index
          exact
          path={ROUTES.AUTHENTIFICATION.NEW_PASSWORD.PATH}
          element={<NewPasswordContainer />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Rooter;

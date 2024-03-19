import React, { useState, useEffect } from 'react';
import Header from '../../elements/header/Header';
import { Grid } from '@material-ui/core';
import { Chat } from './Chat';

const ChatGeneralComponent = ({
  setFormValue,
  formValue,
  HandleSubmit,
  handleChange,
  error,
  setError,
  errortype,
  setErrortype,
  receivedMessage,
  previousMessages,
  Account,
  Friend,
  DataUser,
  HandleFriendClick
}) => {
  const Login = Boolean(localStorage.getItem('login'));

  return (
    <>
      <Grid className="page">
        <Header Connected={Login} />
        <Chat         
              formValue={formValue}
              HandleFriendClick={HandleFriendClick}
              setFormValue={setFormValue}
              handleChange={handleChange}
              HandleSubmit={HandleSubmit}
              error={error}
              setError={setError}
              errortype={errortype}
              setErrortype={setErrortype}
              receivedMessage={receivedMessage}
              previousMessages={previousMessages}
              DataUser={DataUser}
              Friend={Friend}
              />
      </Grid>
    </>
  );
};

export default ChatGeneralComponent;

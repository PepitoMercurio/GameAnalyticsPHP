import { Grid } from '@mui/material';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useState } from 'react';
import styles from '../../../assets-style/scss/components/header/Header.module.scss';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Input from '../input/Input';
import { INPUT } from '../../../constants/inputConst';
import { HandleChange } from '../../../utils/HandleChange';
import { NewArticleInsert } from '../../../utils/API/Article/NewArticleInsert';
import { FetchUserData } from '../../../utils/API/User_API/FetchUserData';
import { API_PATH } from '../../../constants/API_ROUTES';
import { ROUTES } from '../../../constants/routesConst';

export const NewArticle = (gamertag) => {
  const username = gamertag.gamertag;
  console.log(localStorage.getItem('id'));
  const id = localStorage.getItem('id');
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    title: '',
    text: '',
    id: id,
    gamertag,
    username,
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDisagree = () => {
    setOpen(false);
  };

  const wait = (milliseconds) => {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  };

  const HandleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    await NewArticleInsert(API_PATH.ARTICLE.INSERT_ARTICLE.PATH, formValue);
    await wait(5000); // Attendez pendant 2 secondes (ajustez selon vos besoins)
    window.location.href = ROUTES.ARTICLE.PATH;
    setOpen(false);
    setLoading(false);
  };

  return (
    <div>
      <Button className={styles.nav__item} onClick={handleClickOpen}>
        {' '}
        <PostAddIcon className={styles.nav__item__logo} />
        Nouveau Post
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Création d'un Nouvel Article
        </DialogTitle>

        <Input
          required={true}
          name={'input-article'}
          type="text"
          dataOnChange={{
            state: formValue,
            setState: setFormValue,
            name: INPUT.ARTICLE.TITLE.NAME,
          }}
          value={formValue.title}
          onChange={HandleChange}
          placeholder="titre"
        />
        <Input
          required={true}
          name={'input-article'}
          type="text"
          dataOnChange={{
            state: formValue,
            setState: setFormValue,
            name: INPUT.ARTICLE.TEXT.NAME,
          }}
          value={formValue.text}
          onChange={HandleChange}
          placeholder="description"
        />
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree}>Annuler</Button>
          <Button onClick={HandleSubmit} autoFocus>
            {loading ? 'Chargement...' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

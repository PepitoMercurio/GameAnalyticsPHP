import React, { useState } from 'react';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import { ROUTES } from '../../../constants/routesConst';
import TuneIcon from '@mui/icons-material/Tune';
import Navbar from '../bar/Navbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from '../../../assets-style/scss/components/header/Header.module.scss';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ForumIcon from '@mui/icons-material/Forum';
import DescriptionIcon from '@mui/icons-material/Description';
const Header = ({ Connected }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggler = () => setMenuOpen((p) => !p);
  const [open, setOpen] = React.useState(false);

  const [nonFriend, setNonFriend] = useState([]);
  const [friend, setFriend] = useState([]);
  const [almostFriend, setAlmostFriend] = useState([]);
  const [validFriend, setValidFriend] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    window.location.href = ROUTES.AUTHENTIFICATION.SIGN_IN.PATH;
    setOpen(false);
  };

  const Return = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    handleClose();
  };

  const handleDisagree = () => {
    Return();
  };

  // console.log('header ' + Connected);

  return (
    <div className={styles.header}>
      <div className={styles.header__content}>
        <a href={ROUTES.HOME.PATH} className={styles.logo}>
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


        <div className='Search_Bar'>
              <div className={styles.nav__item}>
                <SearchBar setNonFriend= {setNonFriend} setFriend= {setFriend} setAlmostFriend= {setAlmostFriend} setValidFriend= {setValidFriend}/>
              </div>
              {console.log(validFriend)}
              <div className='Search_Result'>
                <SearchResult nonFriend= {nonFriend} friend= {friend} almostFriend= {almostFriend} validFriend= {validFriend}/>
              </div>
            </div>
        <div>
          <nav
            className={`${styles.nav} ${menuOpen ? styles[`nav--open`] : {}}`}
          >

            <a className={styles.nav__item} href={ROUTES.ARTICLE.PATH}>
                  <DescriptionIcon className={styles.nav__item__logo} />
                  Article
                </a>

            <a
              className={styles.nav__item}
              href={ROUTES.CHAT.PATH}
            >
              <ForumIcon className={styles.nav__item__logo_2} />
              Chat
            </a>

            {Connected ? (
              <>
                <a className={styles.nav__item} href={ROUTES.HOME.PATH}>
                  <AccountCircleIcon className={styles.nav__item__logo} />
                  Compte
                </a>
                <div>
                  <a
                    className={styles.nav__item}
                    variant="outlined"
                    onClick={handleClickOpen}
                  >
                    <MeetingRoomIcon className={styles.nav__item__logo} /> Se
                    Déconnecter
                  </a>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      Confirmation de déconnexion
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Êtes-vous sûr de vouloir vous déconnecter ?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleDisagree}>Annuler</Button>
                      <Button onClick={handleAgree} autoFocus>
                        Déconnecter
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </>
            ) : (
              <>
                <a
                  className={styles.nav__item}
                  href={ROUTES.AUTHENTIFICATION.SIGN_IN.PATH}
                >
                  <AccountCircleIcon className={styles.nav__item__logo} />
                  Se Connecter
                </a>
              </>
            )}

            <div className={styles.nav__button__container}>
              <a
                className={styles.nav__item}
                href={ROUTES.AUTHENTIFICATION.SIGN_IN.PATH}
              >
                Se Deconnecter
              </a>
            </div>
          </nav>
        </div>
        <div>
          <div className={styles.header__button__container}>
            <Navbar />
          </div>
          <button className={styles.header__toggler} onClick={menuToggler}>
            {!menuOpen ? <TuneIcon /> : <TuneIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

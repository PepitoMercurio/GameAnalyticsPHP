import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Input from '../../elements/input/Input';
import { INPUT } from '../../../constants/inputConst';
import InputImageFile from '../../elements/input/inputImageFile';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Header from '../../elements/header/Header';
import ForumIcon from '@mui/icons-material/Forum';
import { ROUTES } from '../../../constants/routesConst';
import styles from '../../../assets-style/scss/components/header/Header.module.scss';

const useStyles = makeStyles({
  chatSection: {
    width: '100%',
    height: '80vh',
    backgroundColor: '#434343',
    backgroundImage: 'linear-gradient(147deg, #000000 0%, #434343 74%)',
    color: 'white',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
    color: 'white',
  },
  messageArea: {
    height: '65vh',
    overflowY: 'auto',
    color: 'white',
  },
  color: {
    color: 'grey',
  },
  color_I: {
    color: 'orangered',
  },
});


export const PrivateMessage = ({
  formValue,
  setFormValue,
  handleChange,
  HandleSubmitPrivateMessage,
  receivedPrivateMessage,
  previousPrivateMessages,
  DataUser,
  Friend,
  friend,
  HandleFriendClick
}) => {
  const Login = Boolean(localStorage.getItem('login'));
  const classes = useStyles();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [previousPrivateMessages]);
console.log(previousPrivateMessages)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  return (
    <Grid className="page"><Grid/>
    <Header Connected={Login} />
    <div className='page__general__container'>
      <Grid container>
        <Grid item xs={12}>
          <Typography style={{display : 'flex' , justifyContent : 'center' , marginBottom : '40px'   }} variant="h2" className="header-message">  <Avatar alt={friend.gamertag} src={friend.logo} />  {friend.gamertag}</Typography>
        </Grid>
      </Grid>
      <Grid component={Paper} className={classes.chatSection} container>
        <Grid item xs={3} className={classes.borderRight500}>
        <a
              className={styles.nav__item__chat}
              href={ROUTES.CHAT.PATH}
            >
              <ForumIcon className={styles.nav__item__logo_2} />
              Chat General
            </a>
          <List>
            <ListItem key="RemySharp">
              <ListItemIcon>
                <Avatar alt="Remy Sharp" src={DataUser.photo} />
              </ListItemIcon>
              <ListItemText primary={DataUser.gamertag} />
            </ListItem>
          </List>
         
          <List>
          {Friend.map((friend) => (
            <ListItem   button key={friend.id_user} onClick={() => HandleFriendClick(friend)}>
              <ListItemIcon>
                <Avatar alt={friend.gamertag} src={friend.logo} />
              </ListItemIcon>
              <p primary={friend.gamertag} secondary="online" align="right" >{friend.gamertag}</p>
            </ListItem>
          ))}
          </List>
        </Grid>
        <Grid item xs={9}>
        <List className={classes.messageArea}>
            {previousPrivateMessages.sort((a, b) => a.time.localeCompare(b.time)).map((message, index) => (
              <ListItem  key={index}>
                <Grid style={{backgroundColor : ''}} container>
                  <Grid item xs={12}>
                    <h3 className={classes.color_I} align="left">{message.gamertag}</h3>
                  </Grid>
                  <Grid item xs={12}>
                    <p align="left">{message.message}</p>
                  </Grid>
                  <Grid item xs={12}>
                    <p className={classes.color} align="left">{message.time}</p>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
          <Divider />
          <Grid container style={{ padding: '20px' }}>
            <Grid item xs={11}>
              <form noValidate onSubmit={HandleSubmitPrivateMessage}>
                <Input
                  required={true}
                  name={"input-message"}
                  type="text"
                  dataOnChange={{
                    state: formValue,
                    setState: setFormValue,
                    name: INPUT.MESSAGE.MESSAGE.NAME,
                  }}
                  value={formValue.message}
                  onChange={handleChange}
                  placeholder="Participez"
                />
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
    </Grid>
  );
};

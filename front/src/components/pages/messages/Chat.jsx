import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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
import ForumIcon from '@mui/icons-material/Forum'; 
import InputImageFile from '../../elements/input/inputImageFile';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

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


export const Chat = ({
  formValue,
  setFormValue,
  handleChange,
  HandleSubmit,
  receivedMessage,
  previousMessages,
  DataUser,
  Friend,
  HandleFriendClick
}) => {
  const classes = useStyles();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [previousMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  return (
    <div className='page__general__container'>
      <Grid container>
        <Grid item xs={12}>
          <Typography style={{display : 'flex' , justifyContent : 'center' , marginBottom : '40px'   }} variant="h2" className="header-message">Chat General</Typography>
        </Grid>
      </Grid>
      <Grid component={Paper} className={classes.chatSection} container>
        <Grid item xs={3} className={classes.borderRight500}>
      
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
            {previousMessages.sort((a, b) => a.date.localeCompare(b.date)).map((message, index) => (
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
            <div ref={messagesEndRef} /> {/* Référence à l'élément de défilement */}
          </List>
          <Divider />
          <Grid container style={{ padding: '20px' }}>
            <Grid item xs={11}>
              <form noValidate onSubmit={HandleSubmit}>
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
                {/* <InputImageFile
                required={false}
                classname={'input-image'}
                value={formValue.message.object}
                dataOnChange={{
                  state: formValue,
                  setState: setFormValue,
                  name: INPUT.SIGN_UP.LOGO.BANNER.NAME,
                }}
                onChange={handleChange}
                placeholder="Upload votre bannière"
              /> */}
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

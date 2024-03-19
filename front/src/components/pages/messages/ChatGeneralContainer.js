import React, { useState, useEffect } from 'react';
import ChatGeneralComponent from './ChatGeneralComponent';
import { HandleChange } from '../../../utils/HandleChange';
import io from 'socket.io-client';
import { ROUTES } from '../../../constants/routesConst';
import { FetchUserData } from '../../../utils/API/User_API/FetchUserData';
import { API_PATH } from '../../../constants/API_ROUTES';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FetchFriends } from '../../../utils/API/User_API/FetchFriends';
import { PrivateMessage } from './PrivateMessage';

const ChatGeneralContainer = () => {
  const Login = Boolean(localStorage.getItem('login'));
  if (!Login) {
    window.location.href = ROUTES.AUTHENTIFICATION.SIGN_IN.PATH;
  }
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [formValue, setFormValue] = useState({
    message: '',
  });
  const [receivedMessage, setReceivedMessage] = useState([]);
  const [previousMessages, setPreviousMessages] = useState([]);
  const [receivedPrivateMessage, setReceivedPrivateMessage] = useState([]);
  const [previousPrivateMessages, setPreviousPrivateMessages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [privateChatRooms, setPrivateChatRooms] = useState([]);
  const socket = io.connect('http://localhost:5000');

  useEffect(() => {
    socket.on('receive_private_message', (data) => {
      console.log('receive_private_message ' + data.message);
      setPreviousPrivateMessages((prevMessages) => [
        ...prevMessages,
        {
          message: data.message,
          date: data.date,
          time: data.time,
          gamertag: data.gamertag,
        },
      ]);
    });

    socket.on('previous_private_messages', (messages) => {
      setPreviousPrivateMessages(messages);
      console.log(previousPrivateMessages)
    });

    return () => {
      socket.off('receive_private_message');
      socket.off('previous_private_messages');
    };
  }, []);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log('receive_message ' + data.message);
      setPreviousMessages((prevMessages) => [
        ...prevMessages,
        {
          message: data.message,
          date: data.date,
          time: data.time,
          gamertag: data.gamertag,
        },
      ]);
    });

    socket.on('previous_messages', (messages) => {
       console.log('previous_messages ' + messages);
      setPreviousMessages(messages);
    });

    return () => {
      socket.off('receive_message');
      socket.off('previous_messages');
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const personData = await FetchUserData(
          API_PATH.ACCOUNT.FETCH_DATA.PATH,
          token
        );

        const API = API_PATH.ACCOUNT.FETCH_FRIENDS.PATH;
        const friendsData = await FetchFriends(API);
        setFriends(friendsData);

        // Utilisez les données récupérées comme vous le souhaitez
        const formDataResponse = personData.formData;
        const email = formDataResponse.get('email');
        const nom = formDataResponse.get('nom');
        const prenom = formDataResponse.get('prenom');
        const gamertag = formDataResponse.get('gamertag');
        const id = localStorage.getItem('id');

        const user = {
          name: nom,
          prenom: prenom,
          gamertag: gamertag,
          photo: `http://localhost:8000/PGSQL/Account/Account_Image/${id}/logo_${id}.jpg`,
          ban: `http://localhost:8000/PGSQL/Account/Account_Image/${id}/banner_${id}.jpg`,
          email: email,
        };

        // Faites quelque chose avec les données d'utilisateur
        setUserData(user);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const room = selectedFriend ? selectedFriend.gamertag : 'general';
    if (selectedFriend) {
      socket.emit('join_room', { room });
      console.log('join room', { room });
    }
    else{
      socket.emit('join_room', { room });
      console.log('join room', { room });
    }

    return () => {
      if (selectedFriend) {
        console.log('join room', { room });
        socket.emit('leave_room', { room });
      }
    };
  }, [selectedFriend]);

  const HandleSubmit = async (event) => {
    event.preventDefault();

    const currentDate = new Date();
    const { message } = formValue;
    const { gamertag } = userData;

    const formattedDate = currentDate.toLocaleDateString(undefined, {});
    const formattedTime = currentDate.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });

    const data = {
      message: message,
      date: formattedDate,
      time: formattedTime,
      gamertag: gamertag,
      room: 'general', // Envoyer le message à la room "general"
    };

    socket.emit('send_message', data);
    setReceivedMessage((prevMessages) => [
      ...prevMessages,
      {
        message: data.message,
        date: data.date,
        time: data.time,
        gamertag: data.gamertag,
      },
    ]);

    setFormValue({ message: '' });
  };

  const HandleSubmitPrivateMessage = async (event) => {
    event.preventDefault();

    const currentDate = new Date();
    const { message } = formValue;
    const { gamertag } = userData;

    const formattedDate = currentDate.toLocaleDateString(undefined, {});
    const formattedTime = currentDate.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });

    const data = {
      message: message,
      date: formattedDate,
      time: formattedTime,
      gamertag: gamertag,
      room: selectedFriend.gamertag,
    };

    socket.emit('send_private_message', data);
    setPreviousPrivateMessages((prevMessages) => [
      ...prevMessages,
      {
        message: data.message,
        date: data.date,
        time: data.time,
        gamertag: data.gamertag,
      },
    ]);


    setFormValue({ message: '' });
  };

  const HandleFriendClick = (friend) => {
    if (selectedFriend) {
      socket.emit('leave_room', { room: selectedFriend.gamertag });
    }
    setSelectedFriend(friend);
    console.log('handlefriend');
  };

  return (
    <>
      <div>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {selectedFriend ? (
              <PrivateMessage
                friend={selectedFriend}
                handleChange={HandleChange}
                formValue={formValue}
                setFormValue={setFormValue}
                HandleSubmitPrivateMessage={HandleSubmitPrivateMessage}
                receivedPrivateMessage={receivedPrivateMessage}
                previousPrivateMessages={previousPrivateMessages} 
                DataUser={userData}
                Friend={friends}
                HandleFriendClick={HandleFriendClick}
              />
            ) : (
              <ChatGeneralComponent
                handleChange={HandleChange}
                formValue={formValue}
                setFormValue={setFormValue}
                HandleSubmit={HandleSubmit}
                receivedMessage={receivedMessage}
                previousMessages={previousMessages}
                DataUser={userData}
                Friend={friends}
                HandleFriendClick={HandleFriendClick}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ChatGeneralContainer;

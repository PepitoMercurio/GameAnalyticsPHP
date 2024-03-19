import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { API_PATH } from '../../../constants/API_ROUTES';
import { AcceptFriend } from '../../../utils/API/User_API/AcceptFriend';
import { ROUTES } from '../../../constants/routesConst';

const FriendRequestCard = ({name, logo, id}) => {
  const handleAcceptFriend = async () => {
    const formValue = {
      id: id,
    };
    const SendAcceptFriend = await AcceptFriend(
      API_PATH.ACCOUNT.ACCEPT_FRIEND.PATH, 
      formValue
    );
    window.location.href = ROUTES.HOME.PATH;
  };

  return (
    <>
    <div className="friend_card">
      <div className='friend_card-profil'>
        <img
          className="friend_profil"
          src={logo}
          alt="Jean"
        />
        <p>{name}</p>
      </div>
      <div className="friend-cart_message" onClick={handleAcceptFriend}>
        <FontAwesomeIcon icon={faCheck} />
      </div>
   </div>
   </>
  );
};

export default FriendRequestCard;

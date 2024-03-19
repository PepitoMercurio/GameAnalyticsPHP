import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

const FriendCard = ({name, logo}) => {
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
      <div className="friend-cart_message">
        <FontAwesomeIcon icon={faMessage} />
      </div>
   </div>
   </>
  );
};

export default FriendCard;

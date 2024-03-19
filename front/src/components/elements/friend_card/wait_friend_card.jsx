import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { API_PATH } from '../../../constants/API_ROUTES';
import { AcceptFriend } from '../../../utils/API/User_API/AcceptFriend';
import { ROUTES } from '../../../constants/routesConst';

const WaitFriendCard = ({name, logo, id}) => {

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
   </div>
   </>
  );
};

export default WaitFriendCard;

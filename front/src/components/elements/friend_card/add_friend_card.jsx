import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { API_PATH } from '../../../constants/API_ROUTES';
import { AddFriend } from '../../../utils/API/User_API/AddFriend';
import { ROUTES } from '../../../constants/routesConst';

const AddFriendCard = ({name, logo, id}) => {
  const handleAddFriend = async () => {
    const formValue = {
      id_user: localStorage.getItem('id'),
      id_friend : id,
    };
    const SendAddFriend = await AddFriend(
      API_PATH.ACCOUNT.ADD_FRIEND.PATH, 
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
      <div className="friend-cart_message" onClick={handleAddFriend}>
        <FontAwesomeIcon icon={faPlus} />
      </div>
   </div>
   </>
  );
};

export default AddFriendCard;

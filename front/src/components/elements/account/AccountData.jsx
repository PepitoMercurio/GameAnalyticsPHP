import { useState } from 'react';
import { FetchUserData } from '../../../utils/API/User_API/FetchUserData';
import { API_PATH } from '../../../constants/API_ROUTES';

const token = localStorage.getItem('token');
const id = localStorage.getItem('id');

const logo =
  '../../../../../back/PGSQL/Account/Account_Image/' +
  id +
  '/logo_' +
  id +
  '.jpg';
const banner =
  '../../../../../back/PGSQL/Account/Account_Image/' +
  id +
  '/banner_' +
  id +
  '.jpg';

const UserData = () => {
  const User = {
    name: 'John Doe',
    photo: banner,
    ban: banner,
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur rutrum mi, auctor tristique risus hendrerit a.',
    email: 'john.doe@example.com',
    location: 'New York, USA',
  };

  return User;
};

export default UserData;

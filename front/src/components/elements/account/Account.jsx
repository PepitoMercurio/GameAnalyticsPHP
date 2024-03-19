import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import ProfilPicture from '../ProfilPicture/ProfilPicture';
import { FetchUserData } from '../../../utils/API/User_API/FetchUserData';
import { API_PATH } from '../../../constants/API_ROUTES';
import { AccountCircle } from '@mui/icons-material';
import DeleteAccount from '../delete_account/delete_account';
import PeopleIcon from '@mui/icons-material/People';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import CARD from '../card/Card';
const Account = ({ className , friends }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem('token');
      console.log('token account ' + token);
      const Person = await FetchUserData(
        API_PATH.ACCOUNT.FETCH_DATA.PATH,
        token
      );
      const formDataResponse = Person.formData;
      const email = formDataResponse.get('email');
      const nom = formDataResponse.get('nom');
      const prenom = formDataResponse.get('prenom');
      const gamertag = formDataResponse.get('gamertag');
      const creation_date = formDataResponse.get('creation_date');
      // console.log(formDataResponse)

      const id = localStorage.getItem('id');

      const User = {
        name: nom,
        prenom: prenom,
        gamertag: gamertag,
        photo: `http://localhost:8000/PGSQL/Account/Account_Image/${id}/logo_${id}.jpg`,
        ban: `http://localhost:8000/PGSQL/Account/Account_Image/${id}/banner_${id}.jpg`,
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur rutrum mi, auctor tristique risus hendrerit a.',
        email: email,
        creation_date: creation_date,
      };

      const cardComponent = (
        <>
        <Card className={className}>
          <img className="user-ban" src={User.ban} alt="" />
          <div className="profilImages">
            <img className="user-avatar" src={User.photo} alt="" />
            <div className="user-content">
              <h1 className="display-gamertag">
                <AccountCircle /> {User.gamertag}
              </h1>
              <div className="display-names"></div>
              <h2>
                {User.name} {User.prenom}
              </h2>
              <p className="display-email">{User.email}</p>
              <p style={{color : 'white'}}>Membre depuis le {User.creation_date}</p>
            </div>
            <DeleteAccount  />
          </div>
        </Card>
        <CARD DataUser={''} className={'page__maincard'} />
        </>
      );

      resolve(cardComponent);
    } catch (error) {
      reject(error);
    }
  });
};

export default Account;

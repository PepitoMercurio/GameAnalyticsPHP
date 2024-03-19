import React, { useState } from 'react';

const ProfilPicture = ({ picture, ban }) => {
  return (
    <div className="profilImages">
      <img className="user-ban" src={ban} alt="" />
      <img className="user-avatar" src={picture} alt="" />
    </div>
  );
};

export default ProfilPicture;

import React from 'react';

const Rank = ({ rank, logo, name, score }) => {
  return (
    <div className="rank_card">
      <div className="rank-card__left">
        <p className="number_rank">{rank}</p>

        <img
          className="rank_profil"
          src= {logo}
          alt="Jean"
        />
        <p>{name}</p>
      </div>
      <p className="rank_score">{score}</p>
    </div>
  );
};

export default Rank;

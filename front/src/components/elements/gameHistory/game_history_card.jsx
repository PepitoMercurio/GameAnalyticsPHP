import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

const GameHistoryCard = ({score, date}) => {
  return (
    <>
    <div className="history_card">
      <p>{score}</p>
      <p>{date}</p>
    </div>
   </>
  );
};

export default GameHistoryCard;

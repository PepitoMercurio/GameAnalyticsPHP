import React, { useEffect, useState } from 'react';
import { API_PATH } from '../../../constants/API_ROUTES';
import { FetchBestScore } from '../../../utils/API/User_API/FetchBestScore';
import { FetchLastScore } from '../../../utils/API/User_API/FetchLastScore';

const Score = () => {
  const [bestScore, setBestScore] = useState(null);
  const [lastScore, setLastScore] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBestScore = async () => {
      try {
        const bestScoreResponse = await FetchBestScore(API_PATH.ACCOUNT.FETCH_BEST_SCORE.PATH);
        if (bestScoreResponse.success) {
          const bestScoreValue = bestScoreResponse.bestScore;
          setBestScore(bestScoreValue);
        } else {
          setError('Failed to fetch best score');
        }
      } catch (error) {
        setError('An error occurred while fetching best score');
      }
    };

    const fetchLastScore = async () => {
      try {
        const lastScoreResponse = await FetchLastScore(API_PATH.ACCOUNT.FETCH_LAST_SCORE.PATH);
        if (lastScoreResponse.success) {
          const lastScoreValue = lastScoreResponse.lastScore;
          setLastScore(lastScoreValue);
        } else {
          setError('Failed to fetch best score');
        }
      } catch (error) {
        setError('An error occurred while fetching last score');
      }
    };

    fetchBestScore();
    fetchLastScore();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (bestScore === null || lastScore === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="score_text">
      <p className="last_score">Dernière Partie : {lastScore.last_score}</p>
      <p className="best_score">Meilleur Score : {bestScore.best_score}</p>
    </div>
  );
};

export default Score;

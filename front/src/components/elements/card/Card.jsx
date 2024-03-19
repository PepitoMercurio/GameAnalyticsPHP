import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import SideBar from '../bar/SideBar';
import FriendCard from '../friend_card/friendCard';
import AddFriendCard from '../friend_card/add_friend_card';
import FriendRequestCard from '../friend_card/friend_request_cart';
import Score from '../score/score';
import Rank from '../rank/rank';
import GameHistoryCard from '../gameHistory/game_history_card';
import Item from './Item';
import { FetchRank } from '../../../utils/API/User_API/FetchRank'; // Assurez-vous de spécifier le bon chemin vers le fichier fetchRank.js
import { FetchFriends } from '../../../utils/API/User_API/FetchFriends'
import { FetchNonFriends } from '../../../utils/API/User_API/FetchNonFreind';
import { FetchAlmostFriends } from '../../../utils/API/User_API/FetchAlmostFriend'
import { GameHistory } from '../../../utils/API/User_API/GameHistory';
import { API_PATH } from '../../../constants/API_ROUTES';

const CARD = ({ DataUser, className }) => {
  const [ranks, setRanks] = useState([]);
  const [friends, setFriends] = useState([]);
  const [nonFriends, setNonFriends] = useState([]);
  const [almostFriends, setAlmostFriends] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);
  const [loadingRank, setLoadingRank] = useState(false);
  const [loadingFriend, setLoadingFriend] = useState(false);
  const [loadingAlmostFriend, setLoadingAlmostFriend] = useState(false);
  const [loadingNonFriend, setLoadingNonFriend] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    const fetchRankData = async () => {
      try {
        setLoadingRank(true);
        const API = API_PATH.ACCOUNT.FETCH_RANK.PATH;
        const ranksData = await FetchRank(API);
        setRanks(ranksData);
        setLoadingRank(false);
      } catch (error) {
        console.error(error);
        setLoadingRank(false)
      }
    };



    const fetchFriendsData = async () => {
      try {
        setLoadingFriend(true);
        const API = API_PATH.ACCOUNT.FETCH_FRIENDS.PATH;
        const friendsData = await FetchFriends(API);
        setFriends(friendsData);
        setLoadingFriend(false);
      } catch (error) {
        console.error(error);
        setLoadingFriend(false);
      }
    };

    const fetchNonFriendsData = async () => {
      try {
        setLoadingNonFriend(true);
        const API = API_PATH.ACCOUNT.FETCH_NON_FRIEND.PATH;
        const nonFriendsData = await FetchNonFriends(API);
        setNonFriends(nonFriendsData);
        setLoadingNonFriend(false);
      } catch (error) {
        console.error(error);
        setLoadingNonFriend(false);
      }
    };

    const fetchAlmostFriendsData = async () => {
      try {
        setLoadingAlmostFriend(true);
        const API = API_PATH.ACCOUNT.FETCH_ALMOST_FRIEND.PATH;
        const almostFriendsData = await FetchAlmostFriends(API);
        setAlmostFriends(almostFriendsData);
        setLoadingAlmostFriend(false);
      } catch (error) {
        console.error(error);
        setLoadingAlmostFriend(false);
      }
    };

    const fetchGameHistory = async () => {
      try {
        setLoadingHistory(true);
        const API = API_PATH.ACCOUNT.GAME_HISTORY.PATH;
        const gamesHistory = await GameHistory(API);
        setGameHistory(gamesHistory);
        setLoadingHistory(false);
      } catch (error) {
        console.error(error);
        setLoadingHistory(false);
      }
    }

    fetchAlmostFriendsData();
    fetchNonFriendsData();
    fetchFriendsData();
    fetchRankData();
    fetchGameHistory();
  }, []);

  return (
    <>
      <div className={className}>
        <div className="friends">
          <h2 className="card_title">Liste d'Amis</h2>

          <div className='get-request'>
            {loadingAlmostFriend ? (
                  <div><br/>Chargement des demandes d'amis...</div>
                ) : (
                almostFriends.map((friend) => (
                <FriendRequestCard key={friend.id_user} name={friend.gamertag} logo={friend.logo} id={friend.id}/>
              ))
            )}
          </div>

          <div className='My-friends'>
            {loadingFriend ? (
                <div><br/>Chargement de la liste des amis...</div>
              ) : (
              friends.map((friend) => (
                <FriendCard key={friend.id_user} name={friend.gamertag} logo={friend.logo} id={friend.id}/>
              ))
            )}
          </div>
          
          <div className='send-request'>
            {loadingNonFriend ? (
              <div><br/>Chargement de la liste des utilisateurs...</div>
            ) : (
              nonFriends.map((friend) => (
                <AddFriendCard key={friend.id} name={friend.gamertag} logo={friend.logo} id={friend.id}/>
              ))
            )}
          </div>
        </div>

        <div className='game_history'>
          <h2 className='card_title'>Historique des parties</h2>
          <GameHistoryCard score="Score" date="Date" />
          <br />
          {loadingHistory ? (
            <div><br/>Chargement de l'historique des parties...</div>
          ) : (
            gameHistory.map((history, index) => (
              <GameHistoryCard key={index} score={history.score} date={history.date} />
            ))
          )}
        </div>

        <div className="right-side">
          <div className="score">
            <h2 className="card_title">Score</h2>
            <Score />
          </div>
          <div className="rank">
            <h2 className="card_title">Classement</h2>
            {loadingRank ? (
              <div><br/>Chargement du Classement...</div>
            ) : (
              ranks.map((rank, index) => (
                <Rank key={index} rank={index + 1} logo={rank.logo} name={rank.gamertag} score={rank.score} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CARD;

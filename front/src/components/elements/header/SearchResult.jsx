import * as React from 'react';
import AddFriendCard from '../friend_card/add_friend_card';
import FriendCard from '../friend_card/friendCard';
import FriendRequestCard from '../friend_card/friend_request_cart';
import WaitFriendCard from '../friend_card/wait_friend_card'

export default function SearchResult(result) {
    console.log(result.validFriend)
    return (
    <div className='SearchResult'>
        {result.validFriend.map((friend) => {
            if (friend.gamertag !== "N/A") {
                return (
                <WaitFriendCard key={friend.id_user} name={friend.gamertag} logo={friend.logo} id={friend.id} />
                );
            }
            return null;
        })}

        {result.almostFriend.map((friend) => {
            if (friend.gamertag !== "N/A") {
                return (
                <FriendRequestCard key={friend.id_user} name={friend.gamertag} logo={friend.logo} id={friend.id} />
                );
            }
            return null;
        })}

        {result.friend.map((friend) => {
            if (friend.gamertag !== "N/A") {
                return (
                <FriendCard key={friend.id_user} name={friend.gamertag} logo={friend.logo} id={friend.id} />
                );
            }
            return null;
        })}

        {result.nonFriend.map((friend) => (
            <AddFriendCard key={friend.id} name={friend.gamertag} logo={friend.logo} id={friend.id}/>
        ))}
    </div>
    );
}
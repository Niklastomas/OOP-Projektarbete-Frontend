import React from 'react';
import Friend from './Friend';
import './FriendList.css';

function FriendList({friends}) {
  
    return (
        <div className='friendList'>
            {friends && friends.map(friend => (
                <Friend onClick={() => console.log(friend.id)} key={friend.id} name={friend.username} />
            ))}
        </div>
    )
}

export default FriendList

import React from 'react';
import './UserList.css';
import User from './User';

function UserList({users}) {
  
    return (
        <div className='userList'>
            {users && users.map(user => (
                <User onClick={() => console.log(user.id)} key={user.id} name={user.username} />
            ))}
        </div>
    )
}

export default UserList

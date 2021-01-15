import React, { useEffect, useState } from 'react'
import FriendList from '../../components/friend/FriendList'
import Header from '../../components/header/Header'
import './FriendsView.css'
import axios from '../../utils/axios'
import { useSelector } from 'react-redux'

function FriendsView() {
    const {user} = useSelector((state) => state.user);
    const [friends, setFriends] = useState([]);
    useEffect(() => {
        const getFriends = async () => {
            const {data} = await axios.get('api/User/GetFriends', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                  },
            });
            console.log(data);
            setFriends(data);
        };
        getFriends();
    }, [])
    return (
        
        <div className='friends'>
            <Header />
           <h1 className='friends__title'>Friends</h1>
            <FriendList friends={friends} />
            
        </div>
    )
}

export default FriendsView

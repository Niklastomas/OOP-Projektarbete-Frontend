import React, { useEffect, useState } from 'react'
import FriendList from '../../components/friend/FriendList'
import Header from '../../components/header/Header'
import './FriendsView.css'
import axios from '../../utils/axios'
import { useSelector } from 'react-redux'
import UserSearchField from '../../components/user/userSearchField/UserSearchField'
import UserList from '../../components/user/UserList'



function FriendsView() {
    const {user, friends} = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
              },
        }
        // const getFriends = async () => {
        //     const {data} = await axios.get('api/User/GetFriends', config);
        //     console.log(data);
        //     setFriends(data);
        // };
        const getUsers = async () => {
            const {data} = await axios.get('api/User/GetUsers', config);
            console.log(data);
            setUsers(data);

        }
        // getFriends();
        getUsers();
    }, [user.token])
    return (
        
        <div className='friends'>
            <Header />
            <div className='friends__content'>
                <div className='friends__list'>
                    <h1 className='friends__title'>Your Friends</h1>
                    <FriendList friends={friends} />
                </div>
                <div className='user__list'>
                    <h1 className='friends__title'>Search Users</h1>
                    <UserSearchField />
                    <UserList users={users}/>

                </div>
            </div>
         
            
        </div>
    )
}

export default FriendsView

import React from "react";
import "./UserList.css";
import User from "./User";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";

function UserList({ users, friends }) {
  const { user } = useSelector((state) => state.user);

  const handleAddFriend = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      await axios.post(`api/User/SendFriendRequest/${id}`, {}, config);
      console.log("Successfully sent friend request");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="userList">
      {users ? (
        users.map((user) => (
          <User
            friends={friends}
            id={user.id}
            onClick={() => handleAddFriend(user.id)}
            key={user.id}
            name={user.username}
          />
        ))
      ) : (
        <h3>No users was found</h3>
      )}
    </div>
  );
}

export default UserList;

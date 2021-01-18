import React, { useEffect, useState } from "react";
import Friend from "./Friend";
import axios from "../../utils/axios";
import "./FriendList.css";
import { useSelector } from "react-redux";

function FriendList({ friends }) {
  return (
    <div className="friendList">
      {friends &&
        friends.map((friend) => (
          <Friend
            onClick={() => console.log(friend.id)}
            key={friend.id}
            name={friend.username}
          />
        ))}
    </div>
  );
}

export default FriendList;
import React, { useEffect, useState } from "react";
import Friend from "./Friend";
import axios from "../../utils/axios";
import "./FriendList.css";
import { useSelector } from "react-redux";
import Loader from "../loader/Loader";

function FriendList({ friends }) {
  return (
    <div className="friendList">
      {friends &&
        friends.map((friend) => (
          <Friend key={friend.id} name={friend.username} />
        ))}
    </div>
  );
}

export default FriendList;

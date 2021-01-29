import React from "react";
import Friend from "./Friend";
import "./FriendList.css";

function FriendList({ friends }) {
  return (
    <div className="friendList">
      {friends && friends.length > 0 ? (
        friends.map((friend) => (
          <div key={friend.id}>
            <Friend name={friend.username} />
          </div>
        ))
      ) : (
        <h3 style={{ color: "white" }}>Friend list is empty</h3>
      )}
    </div>
  );
}

export default FriendList;

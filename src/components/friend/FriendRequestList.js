import React from "react";
import "./FriendRequestList.css";
import FriendRequest from "./FriendRequest";

function FriendRequestList({ friendRequests }) {
  return (
    <div className="friendRequestList">
      {friendRequests &&
        friendRequests.map((request) => (
          <FriendRequest
            id={request.id}
            key={request.id}
            sentBy={request.requestSentBy}
            time={request.requestedTime}
          />
        ))}
    </div>
  );
}

export default FriendRequestList;

import React from "react";
import "./FriendRequestList.css";
import FriendRequest from "./FriendRequest";

function FriendRequestList({ friendRequests }) {
  return (
    <div className="friendRequestList">
      {friendRequests.length > 0 ? (
        friendRequests.map((request) => (
          <FriendRequest
            id={request.id}
            key={request.id}
            sentBy={request.requestSentBy}
            time={request.requestedTime}
          />
        ))
      ) : (
        <h3 style={{ color: "white" }}>No friend requests</h3>
      )}
    </div>
  );
}

export default FriendRequestList;

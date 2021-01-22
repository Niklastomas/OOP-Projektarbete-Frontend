import React from "react";
import "./FriendRequest.css";
import TimeAgo from "react-timeago";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch } from "react-redux";
import {
  acceptFriendRequest,
  declineFriendRequest,
} from "../../redux/friendSlice";
// import { AcceptFriendRequest } from "../../redux/userSlice";

function FriendRequest({ id, sentBy, time }) {
  const dispatch = useDispatch();
  const handleAccept = async () => {
    dispatch(acceptFriendRequest(id));
  };
  const handleDecline = async () => {
    dispatch(declineFriendRequest(id));
  };

  return (
    <div className="friendRequest">
      <div className="friendRequest__container">
        <h3>{sentBy.username}</h3>
        <small>
          Sent <TimeAgo date={new Date(time).toUTCString()} />
        </small>
      </div>
      <div className="friendRequest__container">
        <CheckIcon
          className="friendRequest__button"
          style={{ color: "green" }}
          onClick={handleAccept}
        />
        <CloseIcon
          className="friendRequest__button"
          color="secondary"
          onClick={handleDecline}
        />
      </div>
    </div>
  );
}

export default FriendRequest;

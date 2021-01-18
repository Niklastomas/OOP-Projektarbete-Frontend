import React from "react";
import "./FriendRequest.css";
import TimeAgo from "react-timeago";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import axios from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { AcceptFriendRequest } from "../../redux/userSlice";

function FriendRequest({ id, sentBy, time }) {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handleAccept = async () => {
    dispatch(
      AcceptFriendRequest({
        user,
        id,
      })
    );
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
        <CheckIcon style={{ color: "green" }} onClick={handleAccept} />
        <CloseIcon color="secondary" />
      </div>
    </div>
  );
}

export default FriendRequest;

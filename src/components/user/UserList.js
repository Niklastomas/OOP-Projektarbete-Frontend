import React, { useState } from "react";
import "./UserList.css";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import SuccessAlert from "../alerts/SuccessAlert";
import { sendFriendRequest } from "../../redux/friendSlice";
import ErrorAlert from "../alerts/ErrorAlert";

function UserList({ users, friends }) {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.friend);
  const [showAlert, setShowAlert] = useState(false);

  const handleAddFriend = async (id) => {
    setShowAlert(true);
    dispatch(sendFriendRequest(id));
  };

  return (
    <div className="userList">
      {status === "succeeded" && showAlert && (
        <SuccessAlert open={showAlert} onClose={() => setShowAlert(!showAlert)}>
          Successfully sent friend request
        </SuccessAlert>
      )}
      {status === "failed" && showAlert && (
        <ErrorAlert open={showAlert} onClose={() => setShowAlert(!showAlert)}>
          {error}
        </ErrorAlert>
      )}

      {users.length > 0 ? (
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
        <h3 style={{ color: "white" }}>No users was found</h3>
      )}
    </div>
  );
}

export default UserList;

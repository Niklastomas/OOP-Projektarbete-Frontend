import React, { useCallback, useEffect, useState } from "react";
import "./User.css";
import AddIcon from "@material-ui/icons/Add";

function User({ id, name, onClick, friends }) {
  const [friend, setFriend] = useState(false);

  // const checkIfFriends = useCallback(() => {
  //   setFriend(false);
  //   friends?.forEach((friend) => {
  //     if (friend.id.toString() === id) {
  //       setFriend(true);
  //     }
  //   });
  // }, [friends, id]);

  // useEffect(() => {
  //   checkIfFriends();
  // }, [checkIfFriends]);

  return (
    <>
      {!friend && (
        <div className="user">
          <div className="user__content">
            <h3>{name}</h3>

            <AddIcon
              onClick={() => onClick()}
              fontSize="large"
              style={{ color: "green" }}
              cursor="pointer"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default User;

import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import "./ShareModal.css";

function ShareModal({ onSubmit, close, friends }) {
  const [friend, setFriend] = useState("");
  const [message, setMessage] = useState("Check out this movie!");

  const handleSelectChange = (e) => {
    setFriend(e.target.value);
    console.log(friend);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    console.log(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      friend,
      message,
    });
  };
  return (
    <div className="shareModal">
      <div className="shareModal__content">
        <span onClick={() => close()} className="close">
          &times;
        </span>
        {friends ? (
          <form className="sharedModal__form" onSubmit={handleSubmit}>
            <InputLabel id="friend">Friend</InputLabel>
            <Select
              defaultValue=""
              onChange={handleSelectChange}
              labelId="friend"
              placeholder="Friends"
              value={friend}
              style={{ width: "200px" }}
            >
              {friends.map((friend) => (
                <MenuItem key={friend.id} value={friend.username}>
                  {friend.username}
                </MenuItem>
              ))}
            </Select>
            <TextField
              label="Message"
              multiline
              rows={4}
              variant="outlined"
              value={message}
              onChange={handleMessageChange}
            />
            <Button
              type="submit"
              disabled={!friend}
              style={{ width: "200px" }}
              variant="contained"
              color="primary"
            >
              Send
            </Button>
          </form>
        ) : (
          <h3 style={{ color: "black", padding: "40px" }}>
            Add some friends to share movies
          </h3>
        )}
      </div>
    </div>
  );
}

export default ShareModal;

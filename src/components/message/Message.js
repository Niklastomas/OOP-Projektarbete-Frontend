import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import TimeAgo from "react-timeago";
import "./Message.css";

function Message({ message }) {
  const history = useHistory();

  return (
    <>
      {message && (
        <div className="message">
          <h3>From: {message.from}</h3>
          <small>
            Sent <TimeAgo date={new Date(message.sent).toUTCString()} />
          </small>
          <hr />

          <>
            <h3>Message</h3>
            <p>{message.message}</p>
          </>

          <Button
            style={{ margin: "10px 0" }}
            onClick={() => history.push(`/movie/${message.movieId}`)}
            variant="outlined"
          >
            Check out movie
          </Button>
        </div>
      )}
    </>
  );
}

export default Message;

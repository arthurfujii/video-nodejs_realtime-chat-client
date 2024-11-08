import { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000";

function sendMessage(text) {
  return axios.post(`${API_BASE_URL}/messages`, { text });
}

function sendUser(user) {
  return axios.post(`${API_BASE_URL}/users`, { user });
}

export const MessageForm = () => {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [room, setRoom] = useState("");

  return (
    <>
      <div className="container">
        <div className="box">
          <form className="field">
            <div className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="text"
                placeholder="Enter a username"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
            <button className="button">OK</button>
          </form>
          <form
            className="field is-horizontal"
            onSubmit={async (event) => {
              event.preventDefault();
              await sendMessage(text);
              setText("");
            }}
          >
            <input
              type="text"
              className="input"
              placeholder="Enter a message"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <button className="button">Send</button>
          </form>
        </div>
      </div>
    </>
  );
};

import { useContext, useRef } from "react";
import { StatesContext } from "./Context/contextProvider";

const WS_URL = "ws://localhost:5000";

export const MessageForm = () => {
  const { currentUser } = useContext(StatesContext);
  const socket = new WebSocket(WS_URL);
  const messageRef = useRef(null);

  const sendMessage = (e) => {
    e.preventDefault();
    const msg = {
      author: currentUser,
      text: messageRef.current.value,
    };
    socket.send(JSON.stringify(msg));
    messageRef.current.value = "";
    messageRef.current.focus()
  };

  return (
    <form className="field is-horizontal" onSubmit={sendMessage}>
      <input
        type="text"
        className="input"
        placeholder="Enter a message"
        ref={messageRef}
        required
      />
      <button className="button">Send</button>
    </form>
  );
};

import { useContext, useRef } from "react";
import { DispatchContext, StatesContext } from "./Context/contextProvider";

const WS_URL = "ws://localhost:5000";

export const MessageForm = () => {
  const { user } = useContext(StatesContext);
  const dispatch = useContext(DispatchContext);
  const socket = new WebSocket(WS_URL);
  const messageRef = useRef(null);

  const sendMessage = (e) => {
    e.preventDefault();
    const msg = {
      author: user,
      text: messageRef.current.value,
      time: new Intl.DateTimeFormat("pt-BR", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format(new Date()),
    };
    // dispatch({ type: "setMessage", payload: msg });
    socket.send(JSON.stringify(msg));
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

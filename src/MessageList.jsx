import { useContext, useEffect } from "react";
import { DispatchContext, StatesContext } from "./Context/contextProvider";
import axios from "axios";
const API_BASE_URL = "http://127.0.0.1:5000";
const WS_URL = "ws://localhost:5000";

export const MessageList = () => {
  const { messages } = useContext(StatesContext);
  const dispatch = useContext(DispatchContext);
  const socket = new WebSocket(WS_URL);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/messages`)
      .then((msgsFromServer) => {
        dispatch({ type: "setMessages", payload: msgsFromServer.data });
      })
      .catch((error) => console.log(error));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      dispatch({ type: "setMessage", payload: message });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div className="box">
        {messages.map((message, idx) => {
          return (
            <article className="message is-small" key={idx}>
              <div className="message-body">
                ({message.time}){message.author} said: {message.text}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

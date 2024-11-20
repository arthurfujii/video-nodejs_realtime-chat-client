import { useContext, useEffect } from "react";
import { DispatchContext, StatesContext } from "./Context/contextProvider";
import axios from "axios";
const API_BASE_URL = "http://127.0.0.1:5000";
const WS_URL = "ws://localhost:5000";

export const MessageList = () => {
  const { messages, currentRoom } = useContext(StatesContext);
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
      const messages = JSON.parse(event.data);
      console.log(messages)
      dispatch({ type: "setMessages", payload: messages });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      {messages.filter((m) => m.author.id === +currentRoom.id).map((message, idx) => { //TODO: filter messages by room id
        return (
          <article className="message is-small" key={idx}>
            <div className="message-body">
              ({message.time}) {message.author.username} said: {message.text}
            </div>
          </article>
        );
      })}
    </div>
  );
};

import { useEffect } from "react";
import axios from "axios";

const WS_URL = "ws://localhost:5000";
const API_URL = "http://localhost:5000/messages";

export function WebSocketLoader({ onData, onOldData }) {
  const loadData = async () => {
    const response = await axios.get(API_URL);
    return response.data;
  };

  useEffect(() => {
    loadData().then((msgs) => onOldData(msgs.reverse()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const socket = new WebSocket(WS_URL);

    // socket.addEventListener("open", (event) => {
    //   socket.send("Hello Server from client!");
    // });

    socket.addEventListener("message", (event) => {
      const text = JSON.parse(event.data);

      onData(text);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <h1 className="title">Chat App</h1>
    </div>
  );
}

// #region imports
import { useState } from "react";
import "./App.css";
import { MessageForm } from "./MessageForm.jsx";
import { MessageList } from "./MessageList.jsx";
import { WebSocketLoader } from "./WebSocket.jsx";
import { ChatRoom } from "./ChatRoom.jsx";

export function App() {
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  function saveData(message) {
    setMessages((messages) => [message, ...messages]);
  }
  function saveOldData(messages) {
    setMessages(messages);
  }

  return (
    <section className="section content">
      <WebSocketLoader onData={saveData} onOldData={saveOldData} />

      <MessageForm />
    </section>
  );
}

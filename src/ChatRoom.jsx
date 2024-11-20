import { useContext } from "react";
import { MessageForm } from "./MessageForm";
import { MessageList } from "./MessageList";
import { StatesContext } from "./Context/contextProvider";
export const ChatRoom = () => {
  const { messages, currentRoom } = useContext(StatesContext);

  return (
    <div className="container">
      <div className="box">
        <p className="title">Chat Room: {currentRoom.roomName}</p>
        <MessageList />
      </div>
      <div className="box">
        <MessageForm />
      </div>
    </div>
  );
};

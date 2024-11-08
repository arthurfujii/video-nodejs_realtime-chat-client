import { MessageList } from "./MessageList";
export const ChatRoom = ({ messages, room }) => {
  return (
    <div className="container">
      <h1 className="title">Chat Room: {room}</h1>

      <MessageList messages={messages} />
    </div>
  );
};

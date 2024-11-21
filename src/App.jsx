// #region imports
import "bulma/css/bulma.css";
import "bulma-list/css/bulma-list.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./App.css";
import { UserForm } from "./UserForm.jsx";
import { RoomForm } from "./RoomForm.jsx";
import { RoomsList } from "./RoomsList.jsx";
import { ChatRoom } from "./ChatRoom.jsx";

export function App() {
  return (
    <>
      <div className="container">
        <h1 className="title">Chat App</h1>
        <div className="box">
          <UserForm />
          <RoomForm />
          <RoomsList />
        </div>
        <ChatRoom />
      </div>
    </>
  );
}

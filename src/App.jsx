// #region imports
import { useContext, useEffect, useRef, useState } from "react";
import EventEmitter from "events";
import axios from "axios";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./App.css";
import { DispatchContext, StatesContext } from "./Context/contextProvider.jsx";
import { UserForm } from "./UserForm.jsx";
import { RoomForm } from "./RoomForm.jsx";
import { MessageForm } from "./MessageForm.jsx";
import { MessageList } from "./MessageList.jsx";

const WS_URL = "ws://localhost:5000";
const API_BASE_URL = "http://localhost:5000";

export function App() {
  const dispatch = useContext(DispatchContext);
  const { user, users, room, rooms, message, messages } =
    useContext(StatesContext);
  const socket = new WebSocket(WS_URL);

  return (
    <>
      <div className="container">
        <h1 className="title">Chat App</h1>
        <div className="box">
          <UserForm />
          <RoomForm />
        </div>
        <div className="box">
          <MessageList />
        </div>
        <div className="box">
          <MessageForm />
        </div>
      </div>
    </>
  );
}

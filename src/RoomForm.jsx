import { useContext, useRef, useState } from "react";
import { DispatchContext, StatesContext } from "./Context/contextProvider";
import axios from "axios";
const API_BASE_URL = "http://127.0.0.1:5000";

export const RoomForm = () => {
  const roomRef = useRef(null);
  const [error, setError] = useState("");
  const dispatch = useContext(DispatchContext);
  const { rooms } = useContext(StatesContext);
  const onRoomSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "setRoom", payload: roomRef.current.value });
    console.log(roomRef.current.value);
  };

  return (
    <form className="field" onSubmit={onRoomSubmit}>
      <div className="control has-icons-left has-icons-right">
        <input
          className="input"
          type="text"
          placeholder="Enter a room"
          ref={roomRef}
          required
        />
        <span className="icon is-small is-left">
          <i className="fas fa-comments"></i>
        </span>
      </div>
      <button className="cell is-col-span-1 button" type="submit">
        Join
      </button>
    </form>
  );
};

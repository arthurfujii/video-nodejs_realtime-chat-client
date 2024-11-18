import { useContext, useEffect, useRef } from "react";
import { DispatchContext, StatesContext } from "./Context/contextProvider";
import axios from "axios";
const API_BASE_URL = "http://127.0.0.1:5000";

export const JoinForm = (e) => {
  const dispatch = useContext(DispatchContext);
  const { users } = useContext(StatesContext);
  const roomRef = useRef(null);
  const userRef = useRef(null);
  const loadData = async () => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    dispatch({ type: "setUsers", payload: response.data });

    loadData();
  };

  const onJoinRoom = (e) => {
    e.preventDefault();
    if (userRef.current.value && roomRef.current.value) {
      axios.post(`${API_BASE_URL}/users`, {
        username: userRef.current.value,
        room: roomRef.current.value,
      });
    }
  };

  useEffect(() => {
    const evtSource = new EventSource(`${API_BASE_URL}/users`);

    evtSource.onmessage = (e) => {
      dispatch({ type: "setUser", payload: JSON.parse(e.data) });
    };

    return () => {
      evtSource.close();
    };
  }, []);

  return (
    <>
      <form className="field" onSubmit={onJoinRoom}>
        <div className="fixed-grid has-9-cols">
          <div className="grid">
            <div className="cell is-col-span-4 control has-icons-left has-icons-right">
              <input
                className="input"
                type="text"
                placeholder="Enter a username"
                ref={userRef}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
              {/* <p>actual User: {user.username}</p> */}
            </div>
            <div className="cell is-col-span-4 control has-icons-left has-icons-right">
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
              {/* <p>actual Room: {user.room}</p> */}
            </div>
            <button className="cell is-col-span-1 button" type="submit">
              Join
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

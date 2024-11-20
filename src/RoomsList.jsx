import { useContext, useEffect } from "react";
import axios from "axios";
import { DispatchContext, StatesContext } from "./Context/contextProvider";
const API_BASE_URL = "http://127.0.0.1:5000";

export const RoomsList = () => {
  const { rooms, currentUser } = useContext(StatesContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/allrooms`)
      .then((roomsFromServer) => {
        dispatch({ type: "setRooms", payload: roomsFromServer.data });
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const evtSource = new EventSource(`${API_BASE_URL}/rooms`);

    evtSource.onmessage = (e) => {
      dispatch({ type: "setRooms", payload: JSON.parse(e.data) });
    };

    return () => {
      evtSource.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="list">
      {rooms.map((room, i) => {
        const onDeleteRoom = async () => {
          console.log("delete", room.id);
          await axios.delete(`${API_BASE_URL}/rooms/${room.id}`).then(
            () =>
              room.users.length === 0 &&
              dispatch({
                type: "setRooms",
                payload: rooms.filter((r) => r.id !== room.id),
              })
          );
        };
        const onJoinRoom = async () => {
          await axios
            .patch(`${API_BASE_URL}/users/${currentUser.id}`, {
              roomId: room.id,
            })
            .then((updatedUser) => {
              dispatch({ type: "setCurrentUser", payload: updatedUser.data });
              axios
                .patch(`${API_BASE_URL}/rooms/${room.id}`, { updatedUser })
                .then((updatedRoom) => {
                  console.log(updatedRoom.data)
                  dispatch({ type: "setCurrentRoom", payload: updatedRoom.data });
                });
            });
        };
        return (
          <div className="list-item" key={i}>
            <div className="list-item-content">
              <div className="list-item-title">Room: {room.roomName}</div>
              <div className="list-item-description">
                Users in room: {room.users.map((u) => u.username).join(", ")}
              </div>
            </div>

            <div className="list-item-controls">
              <div className="buttons is-right">
                <button className="button" onClick={onJoinRoom}>
                  <span className="icon is-small">
                    <i className="fa-solid fa-right-to-bracket"></i>
                  </span>
                  <span>Join</span>
                </button>

                {/* <button className="button">
                  <span className="icon is-small">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </span>
                </button> */}

                <button className="button" onClick={onDeleteRoom}>
                  <span className="icon is-small">
                    <i className="fa-solid fa-trash"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

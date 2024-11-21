import axios from "axios";
import { useContext, useRef, useEffect, useState } from "react";
import { DispatchContext } from "./Context/contextProvider";
import { useLocalStorage } from "./Utils/useLocalStorage";
const API_BASE_URL = "http://127.0.0.1:5000";

export const UserForm = () => {
  const dispatch = useContext(DispatchContext);
  const [user, setUser] = useLocalStorage("currentUser", {});
  const userRef = useRef(null);
  const [error, setError] = useState("");

  const onUserSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${API_BASE_URL}/users`, { username: userRef.current.value })
      .then((user) => {
        setUser(user.data);
        dispatch({ type: "setCurrentUser", payload: user.data });
      })
      .catch((error) => {
        setError(error.response.data);
        setTimeout(() => {
          setError("");
          userRef.current.value = "";
        }, 5000);
      });
  };

  const onDeleteUser = async () => {
    await axios.delete(`${API_BASE_URL}/users/${user.id}`);
    setUser("");
    dispatch({ type: "setCurrentUser", payload: {} });
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/allusers`)
      .then((usersFromServer) => {
        dispatch({ type: "setUsers", payload: usersFromServer.data });
      })
      .catch((error) => console.log(error));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const evtSource = new EventSource(`${API_BASE_URL}/users`);

    evtSource.onmessage = (e) => {
      dispatch({ type: "setUsers", payload: JSON.parse(e.data) });
    };

    return () => {
      evtSource.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!user ? (
        <form className="field" onSubmit={onUserSubmit}>
          <div className="control has-icons-left has-icons-right">
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
          </div>
          <button className="button" type="submit">
            Ok
          </button>
        </form>
      ) : (
        <div className="notification is-link">
          <button className="delete" onClick={onDeleteUser}></button>
          Current user: {user.username}
        </div>
      )}
      {error && <div className="notification is-danger">Error: {error}</div>}
    </>
  );
};

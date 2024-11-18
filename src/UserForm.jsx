import axios from "axios";
import { useContext, useRef, useState } from "react";
import { DispatchContext, StatesContext } from "./Context/contextProvider";
import cn from "classnames";
const API_BASE_URL = "http://127.0.0.1:5000";

export const UserForm = () => {
  const dispatch = useContext(DispatchContext);
  const { user } = useContext(StatesContext);
  const userRef = useRef(null);

  const onUserSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "setUser", payload: userRef.current.value });
    console.log(userRef.current.value);
  };

  return (
    <>
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
    </>
  );
};

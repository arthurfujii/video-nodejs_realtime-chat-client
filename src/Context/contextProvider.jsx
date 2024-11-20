import { createContext, useReducer } from "react";

const initialStates = {
  message: {},
  messages: [],
  users: [],
  currentUser: {},
  rooms: [],
  currentRoom: {},
};

const reducer = (states, action) => {
  switch (action.type) {
    case "setMessages":
      return { ...states, messages: action.payload };
    case "setMessage":
      return { ...states, messages: [action.payload, ...states.messages] };
    case "setRooms":
      return { ...states, rooms: action.payload };
    case "setCurrentRoom":
      return { ...states, currentRoom: action.payload };
    case "setUsers":
      return { ...states, users: action.payload };
    case "setCurrentUser":
      return { ...states, currentUser: action.payload };
    default:
      return states;
  }
};

export const StatesContext = createContext(initialStates);
export const DispatchContext = createContext(() => {});

export const ContextProvider = ({ children }) => {
  const [states, dispatch] = useReducer(reducer, initialStates);

  return (
    <StatesContext.Provider value={states}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StatesContext.Provider>
  );
};

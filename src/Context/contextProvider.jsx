import { createContext, useReducer } from "react";

const initialStates = {
  room: "",
  rooms: [],
  message: {},
  messages: [],
  user: "",
  users: [],
  isEditingUser: false,
};

const reducer = (states, action) => {
  switch (action.type) {
    case "setRooms":
      return { ...states, rooms: action.payload };
    case "setRoom":
      return { ...states, rooms: [action.payload, ...states.rooms] };
    case "setMessages":
      return { ...states, messages: action.payload };
    case "setMessage":
      return { ...states, messages: [action.payload, ...states.messages] };
    case "setUsers":
      return { ...states, users: action.payload };
    case "setUser":
      return { ...states, users: [action.payload, ...states.users] };
    case "setIsEditingUser":
      return { ...states, isEditingUser: action.payload };
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

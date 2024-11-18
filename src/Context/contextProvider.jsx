import { createContext, useReducer } from "react";

const initialStates = {
  message: {},
  messages: [],
  user: "",
  users: [],
};

const reducer = (states, action) => {
  switch (action.type) {
    case "setMessages":
      return { ...states, messages: action.payload };
    case "setMessage":
      return { ...states, messages: [action.payload, ...states.messages] };
    case "setUsers":
      return { ...states, users: action.payload };
    case "setUser":
      return { ...states, users: [action.payload, ...states.users] };
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

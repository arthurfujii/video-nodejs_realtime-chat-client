// #region imports
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./App.css";
import { MessageForm } from "./MessageForm.jsx";
import { MessageList } from "./MessageList.jsx";
import { JoinForm } from "./JoinForm.jsx";

export function App() {
  return (
    <>
      <div className="container">
        <h1 className="title">Chat App</h1>
        <div className="box">
          <JoinForm />
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

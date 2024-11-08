import { useEffect } from "react";

const API_URL = "http://127.0.0.1:5000/messages";

export function ServerSentEventsLoader({ onData }) {
  useEffect(() => {
    const evtSource = new EventSource(API_URL);

    evtSource.onmessage = (event) => {
      onData(JSON.parse(event.data));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <h1 className="title">Server Sent Events</h1>;
}

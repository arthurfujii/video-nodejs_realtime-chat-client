import { useEffect } from "react";

const axios = require("axios");

const API_URL = "http://127.0.0.1:5000/messages";

export function ShortPollingLoader({ onData }) {
  const loadData = async () => {
    const response = await axios.get(API_URL);

    onData(response.data);
  };

  useEffect(() => {
    loadData();

    setInterval(loadData, 5000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className="title">Short polling</h1>
    </>
  );
}

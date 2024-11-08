export const MessageList = ({ messages }) => {
  return (
    <div className="container">
      <div className="box">
        {messages.map((message, idx) => {
          const timestamp = new Date(message.time).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return (
            <article class="message is-small" key={idx}>
              <div class="message-body">
                ({timestamp}){message.author} said: {message.text}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

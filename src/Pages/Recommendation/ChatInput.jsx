function ChatInput({
  input,
  setInput,
  sendMessage,
}) {

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="card-footer p-3">

      <div className="input-group">

        <input
          type="text"
          className="form-control"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          className="btn btn-primary px-4"
          onClick={sendMessage}
        >
          <i className="bi bi-send-fill"></i>
        </button>

      </div>

    </div>
  );
}

export default ChatInput;
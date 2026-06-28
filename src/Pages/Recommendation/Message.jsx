function Message({ sender, text }) {
  const isUser = sender === "user";

  return (
    <div
      className={`d-flex mb-3 ${
        isUser
          ? "justify-content-end"
          : "justify-content-start"
      }`}
    >
      {!isUser && (
        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
          width="40"
          height="40"
          className="me-2 rounded-circle"
        />
      )}

      <div
        className={`p-3 rounded-4 shadow-sm ${
          isUser
            ? "bg-primary text-white"
            : "bg-white"
        }`}
        style={{
          maxWidth: "70%",
        }}
      >
        {text}
      </div>

      {isUser && (
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          width="40"
          height="40"
          className="ms-2 rounded-circle"
        />
      )}
    </div>
  );
}

export default Message;
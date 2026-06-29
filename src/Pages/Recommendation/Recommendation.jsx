import { useState, useEffect, useRef } from "react";
import questions from "./questions";
import { askGemini, askChat } from "../../services/gemini";
import { getMovie, getSeries } from "../../services/tmdb";
import MovieCard from "../../Components/MovieCard/MovieCard";
import "./Recommendation.css";

function Recommendation() {
  const profile = JSON.parse(sessionStorage.getItem("currentUser")) || {};
  const chatKey = `chat_${profile.email}`;
  const savedChat = JSON.parse(localStorage.getItem(chatKey)) || {};

  const [messages, setMessages] = useState(
    savedChat.messages || [{ sender: "bot", text: questions[0] }],
  );
  const [reason, setReason] = useState(savedChat.reason || "");
  const [movie, setMovie] = useState(savedChat.movie || null);
  const [step, setStep] = useState(savedChat.step || 0);
  const [answers, setAnswers] = useState(savedChat.answers || []);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatMode, setChatMode] = useState(savedChat.chatMode || false);
  const [title, setTitle] = useState(savedChat.title || "");
  const [category, setCategory] = useState(savedChat.category || "");

  const bottomRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(
      chatKey,
      JSON.stringify({
        messages,
        movie,
        reason,
        title,
        category,
        answers,
        step,
        chatMode,
      }),
    );
  }, [messages, movie, reason, title, category, answers, step, chatMode]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    if (chatMode) {
      const userMessage = input;
      setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
      setInput("");
      setLoading(true);
      try {
        const reply = await askChat(profile, movie, messages, userMessage);
        if (reply.includes("Title:")) {
          const lines = reply.split("\n");
          const newTitle = lines
            .find((l) => l.startsWith("Title:"))
            ?.replace("Title:", "")
            .trim();
          const newCategory = lines
            .find((l) => l.startsWith("Category:"))
            ?.replace("Category:", "")
            .trim();
          const newReason = lines
            .find((l) => l.startsWith("Reason:"))
            ?.replace("Reason:", "")
            .trim();
          setTitle(newTitle);
          setCategory(newCategory);
          setReason(newReason);
          let data = null;
          if (newCategory === "Movie") data = await getMovie(newTitle);
          if (newCategory === "Series") data = await getSeries(newTitle);
          setMovie(data);
        }
        setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: error.message },
        ]);
      } finally {
        setLoading(false);
      }
      return;
    }

    const updatedAnswers = [...answers, input];
    setAnswers(updatedAnswers);
    const updatedMessages = [...messages, { sender: "user", text: input }];

    if (step < questions.length - 1) {
      updatedMessages.push({ sender: "bot", text: questions[step + 1] });
      setMessages(updatedMessages);
      setStep(step + 1);
      setInput("");
      return;
    }

    updatedMessages.push({ sender: "bot", text: "Gira is thinking..." });
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const result = await askGemini(profile, updatedAnswers);
      const lines = result.split("\n");
      const aiTitle = lines
        .find((l) => l.startsWith("Title:"))
        ?.replace("Title:", "")
        .trim();
      const aiCategory = lines
        .find((l) => l.startsWith("Category:"))
        ?.replace("Category:", "")
        .trim();
      const aiReason = lines
        .find((l) => l.startsWith("Reason:"))
        ?.replace("Reason:", "")
        .trim();
      setTitle(aiTitle);
      setCategory(aiCategory);
      setReason(aiReason);
      let data = null;
      if (aiCategory === "Movie") data = await getMovie(aiTitle);
      if (aiCategory === "Series") data = await getSeries(aiTitle);
      setMovie(data);
      setChatMode(true);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: result },
        {
          sender: "bot",
          text: "You can now speak with me in Arabic or English about the current nomination or request a new nomination.",
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { sender: "bot", text: error.message }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    localStorage.removeItem(chatKey);
    setMessages([{ sender: "bot", text: questions[0] }]);
    setMovie(null);
    setReason("");
    setTitle("");
    setCategory("");
    setAnswers([]);
    setStep(0);
    setChatMode(false);
    setInput("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="rec-page">
      <div className="rec-wrapper">
        {/* ── Main chat card ── */}
        <div className="rec-card">
          {/* Header */}
          <div className="rec-header">
            <div className="rec-bot-icon">
              <i className="bi bi-robot"></i>
            </div>
            <h2 className="rec-title">AI Recommendation</h2>
            <p className="rec-subtitle">
              I'm here to help you find the perfect
              <br />
              <strong>Movies, Games, or Series!</strong>
            </p>
          </div>

          {/* Chat messages */}
          <div className="rec-chatbox">
            {messages.map((msg, i) => (
              <div key={i} className={`rec-msg ${msg.sender}`}>
                {msg.sender === "bot" && (
                  <div className="rec-msg-avatar">
                    <i className="bi bi-robot"></i>
                  </div>
                )}
                <div className="rec-msg-bubble">
                  {msg.text.split("\n").map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < msg.text.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </div>
                {/* {msg.sender === "user" && (
                  <div
                    className="rec-msg-avatar"
                    style={{
                      background: "linear-gradient(135deg,#3b82f6,#2563eb)",
                    }}
                  >
                    {getInitials(profile.name) || (
                      <i className="bi bi-person"></i>
                    )}
                  </div>
                )} */}
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="rec-typing">
                <div className="rec-msg-avatar">
                  <i className="bi bi-robot"></i>
                </div>
                <div className="rec-typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={bottomRef}></div>
          </div>

          {/* Input bar */}
          <div className="rec-input-bar">
            <input
              className="rec-input"
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
            <button className="rec-send-btn" onClick={sendMessage}>
              <i className="bi bi-send-fill"></i>
            </button>
          </div>

          {/* Clear Chat */}
          <button className="rec-clear-btn" onClick={clearChat}>
            <i className="bi bi-trash"></i> Clear Chat
          </button>
        </div>

        {/* ── Movie / Series card ── */}
        {(category === "Movie" || category === "Series") && movie && (
          <div className="rec-media-card">
            <MovieCard movie={movie} reason={reason} />
          </div>
        )}

        {/* ── Game card ── */}
        {category === "Game" && title && (
          <div className="rec-game-card">
            <div className="rec-game-emoji">🎮</div>
            <h3 className="rec-game-title">{title}</h3>
            <span className="rec-game-badge">{category}</span>
            <hr className="rec-game-divider" />
            <p className="rec-game-reason-title">Why AI chose this?</p>
            <p className="rec-game-reason">{reason}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Recommendation;

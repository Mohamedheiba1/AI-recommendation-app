import { useState, useEffect } from "react";
import ChatBox from "./ChatBox";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import questions from "./questions";
import { askGemini, askChat } from "../../services/gemini";
import { getMovie, getSeries } from "../../services/tmdb";
import MovieCard from "../../Components/MovieCard/MovieCard";

function Recommendation() {
  const profile = JSON.parse(sessionStorage.getItem("currentUser")) || {};

  const chatKey = `chat_${profile.email}`;
  const savedMessages = JSON.parse(localStorage.getItem(chatKey));

  const [messages, setMessages] = useState(
    savedMessages || [
      {
        sender: "bot",
        text: questions[0],
      },
    ],
  );
  const [reason, setReason] = useState("");
  const [movie, setMovie] = useState(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatMode, setChatMode] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    localStorage.setItem(chatKey, JSON.stringify(messages));
  }, [messages]);
  const sendMessage = async () => {
    if (!input.trim()) return;

    // =========================
    // Chat Mode
    // =========================
    if (chatMode) {
      const userMessage = input;

      setMessages((prev) => [
        ...prev,
        {
          sender: "user",
          text: userMessage,
        },
      ]);

      setInput("");
      setLoading(true);

      try {
        const reply = await askChat(profile, movie, messages, userMessage);

        // لو الـ AI رجع Recommendation جديدة
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

          if (newCategory === "Movie") {
            data = await getMovie(newTitle);
          } else if (newCategory === "Series") {
            data = await getSeries(newTitle);
          }

          setMovie(data);
        }

        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: reply,
          },
        ]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: error.message,
          },
        ]);
      } finally {
        setLoading(false);
      }

      return;
    }

    const updatedAnswers = [...answers, input];
    setAnswers(updatedAnswers);

    const updatedMessages = [
      ...messages,
      {
        sender: "user",
        text: input,
      },
    ];
    if (step < questions.length - 1) {
      updatedMessages.push({
        sender: "bot",
        text: questions[step + 1],
      });

      setMessages(updatedMessages);
      setStep(step + 1);
      setInput("");
      return;
    }

    updatedMessages.push({
      sender: "bot",
      text: "جاري تحليل إجاباتك...",
    });

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const result = await askGemini(profile, updatedAnswers);

      const lines = result.split("\n");

      const aiTitle = lines
        .find((line) => line.startsWith("Title:"))
        ?.replace("Title:", "")
        .trim();

      const aiCategory = lines
        .find((line) => line.startsWith("Category:"))
        ?.replace("Category:", "")
        .trim();

      const aiReason = lines
        .find((line) => line.startsWith("Reason:"))
        ?.replace("Reason:", "")
        .trim();

      setTitle(aiTitle);
      setCategory(aiCategory);
      setReason(aiReason);

      let data = null;

      if (aiCategory === "Movie") {
        data = await getMovie(aiTitle);
      } else if (aiCategory === "Series") {
        data = await getSeries(aiTitle);
      }

      // Game مش محتاج API
      setMovie(data);

      setChatMode(true);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: result,
        },
        {
          sender: "bot",
          text: "يمكنك الآن التحدث معي بالعربية أو الإنجليزية عن الترشيح الحالي أو طلب ترشيح جديد.",
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: error.message,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-dark text-white">AI Recommendation</div>

        <ChatBox messages={messages} />

        {loading && <TypingIndicator />}

        <ChatInput
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
        />

        

        {/* Movie أو Series */}
        {(category === "Movie" || category === "Series") && movie && (
          <MovieCard movie={movie} reason={reason} />
        )}

        {/* Game */}
        {category === "Game" && (
          <div className="card mt-4 shadow-lg">
            <div className="card-body text-center">
              <h2 className="fw-bold">🎮 {title}</h2>

              <span className="badge bg-success fs-6">{category}</span>

              <hr />

              <h5>Why AI chose this?</h5>

              <p>{reason}</p>
            </div>
          </div>
        )}
        <button
  className="btn btn-danger"
  onClick={() => {
    localStorage.removeItem(chatKey);

    setMessages([
      {
        sender: "bot",
        text: questions[0],
      },
    ]);

    setAnswers([]);
    setStep(0);
    setMovie(null);
    setReason("");
    setChatMode(false);
  }}
>
  Clear Chat
</button>
      </div>
      
    </div>
  );
}

export default Recommendation;

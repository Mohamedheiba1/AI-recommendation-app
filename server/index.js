import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.post("/recommend", async (req, res) => {
  try {
    const { profile, answers } = req.body;

    const type = answers[0]; // Movie أو Game أو Series
    const genre = answers[1];
    const age = answers[2]; // New أو Old
    const rating = answers[3]; // Yes أو No

    const prompt = `
You are an expert entertainment recommendation AI.

Your task is to recommend exactly ONE entertainment title based on the user's profile and answers.

========================
USER PROFILE
========================
Name: ${profile.name}
Favorite Movies: ${profile.movies}
Favorite Games: ${profile.games}
Favorite Series: ${profile.series}
Favorite Genres: ${profile.genres}
Favorite Music: ${profile.music}
Hobbies: ${profile.hobbies}

========================
USER REQUEST
========================
Category: ${type}
Preferred Genre: ${genre}
Release Preference: ${age}
Highly Rated Only: ${rating}

========================
RULES
========================

1. Detect the requested category.

- Movie → recommend ONLY a movie.
- Series → recommend ONLY a TV series.
- Game → recommend ONLY a video game.

Never recommend another category.

2. The recommendation MUST match:
- the user's profile
- favorite genres
- favorite movies/games/series
- hobbies whenever possible

3. If "Highly Rated Only" is Yes,
recommend a title with excellent public ratings.

4. If "Release Preference" is:
- New → recommend a modern/recent title.
- Old → recommend a classic title.

5. Recommend a REAL and POPULAR title only.

6. Keep the reason short (1-2 sentences).

7. Return ONLY the following format.
Do not add explanations, markdown, bullets, or extra text.

Title:
Category:
Reason:
`;

    const chat = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    res.json({
      message: chat.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});

app.post("/chat", async (req, res) => {
  try {
    const { profile, movie, messages, message } = req.body;

    const conversation = messages
      .map((m) => `${m.sender}: ${m.text}`)
      .join("\n");

    const prompt = `
You are an intelligent entertainment AI assistant.

Your role is to chat naturally like ChatGPT.

========================
USER PROFILE
========================
Name: ${profile.name}
Favorite Movies: ${profile.movies}
Favorite Games: ${profile.games}
Favorite Series: ${profile.series}
Favorite Genres: ${profile.genres}
Favorite Music: ${profile.music}
Hobbies: ${profile.hobbies}

========================
CURRENT RECOMMENDATION
========================
Title: ${movie?.title || ""}
Overview: ${movie?.overview || ""}

========================
CONVERSATION HISTORY
========================
${conversation}

========================
NEW USER MESSAGE
========================
${message}

========================
RULES
========================

1. Reply naturally like ChatGPT.

2. Always answer in the SAME language used by the user.
- If the user writes in Arabic, answer in Arabic.
- If the user writes in English, answer in English.

3. Remember the whole conversation and use previous messages as context.

4. If the user asks about the current recommendation, answer based on it.

5. If the user asks for another recommendation:
   - Detect whether they want a Movie, TV Series, or Video Game.
   - Recommend ONLY ONE title that matches their preferences.

6. If the user changes genre (Action, Comedy, Horror, RPG, Drama, etc.), adapt your recommendation.

7. Explain recommendations without spoilers unless the user explicitly asks.

8. Keep answers friendly, concise, and helpful.

9. If the user is only chatting or asking questions, answer normally.

10. ONLY when recommending a new title, return EXACTLY this format:

Title:
Category:
Reason:

Do not include any extra text before or after this format.
`;

    const chat = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    res.json({
      message: chat.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

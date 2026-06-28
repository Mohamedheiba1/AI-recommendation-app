export async function askGemini(profile, answers) {
  const response = await fetch("https://ai-recommendation-app-3.onrender.com/recommend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      profile,
      answers,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data.message;
}

export async function askChat(profile, movie, messages, message) {
  const response = await fetch("https://ai-recommendation-app-3.onrender.com/chat", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      profile,
      movie,
      messages,
      message,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data.message;
}

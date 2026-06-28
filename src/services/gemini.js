export async function askGemini(profile, answers) {
  const response = await fetch("http://localhost:5000/recommend", {
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

export async function askChat(
  profile,
  movie,
  messages,
  message
) {
  const response = await fetch(
    "http://localhost:5000/chat",
    {
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
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data.message;
}
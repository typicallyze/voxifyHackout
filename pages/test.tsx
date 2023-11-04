import React, { useEffect, useState } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default function Upload() {
  const [chatCompletion, setChatCompletion] = useState("");

  useEffect(() => {
    const getChatCompletion = async () => {
      const response = await openai.chat.completions.create({
        messages: [{ role: "user", content: "Say this is a test" }],
        model: "gpt-3.5-turbo",
      });
      setChatCompletion(`${response}`);
    };
    getChatCompletion();
  }, []);

  return (
    <div>
      <p>User: Say this is a test</p>
      <p>ChatGPT: {chatCompletion}</p>
    </div>
  );
};


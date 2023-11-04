import React, { useEffect, useState } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ChatComponent = () => {
  const [chatCompletion, setChatCompletion] = useState("");

  useEffect(() => {
    const getChatCompletion = async () => {
      const response = await openai.chat.completions.create({
        messages: [{ role: "user", content: "Say this is a test" }],
        model: "gpt-3.5-turbo",
      });
      setChatCompletion(response.data.choices[0].message.content);
    };
    getChatCompletion();
  }, []);

  return (
    <div className="chat-component">
      <p>User: Say this is a test</p>
      <p>ChatGPT: {chatCompletion}</p>
    </div>
  );
};

export default ChatComponent;

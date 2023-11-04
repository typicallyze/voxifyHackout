import React, { useEffect, useState } from "react";
import OpenAI from "openai";

export default function Upload() {
    const openai = new OpenAI({
        apiKey: "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",
        dangerouslyAllowBrowser: true 
    });
    const [response, setResponse] = useState("");
    useEffect(() => {
        async function getResponse() {
            const chatCompletion = await openai.chat.completions.create({
                messages: [{ role: "user", content: "name the biggest plant that you know of" }],
                model: "gpt-3.5-turbo",
            });
            setResponse(`${chatCompletion.choices[0]?.message?.content}`);
        }
        getResponse();
    }, []);
  return (
    <div>
      <p>User: Say this is a test</p>
      <p>ChatGPT: {`${response}`}</p>
    </div>
  );
};

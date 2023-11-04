import { useState, useEffect } from "react";
import OpenAI from "openai";
let a = 0;
const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

export default function Home() {
  const [file, setFile] = useState<File>();
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (a > 0) {
      console.log("Transcript changed ?");
      async function getResponse() {
        const chatCompletion = await openai.chat.completions.create({
          messages: [
            {
              role: "user",
              content: `this is a the transcript of my speech can you please tell me what mistakes I made and how I can improve them?"${transcript} "`,
            },
          ],
          model: "gpt-3.5-turbo",
        });
        setResponse(`${chatCompletion.choices[0]?.message?.content}`);
      }
      getResponse();
    }
    a++; //idk what the real way to do this is but this works ¯\_(ツ)_/¯
    console.log(a);
  }, [transcript]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      console.log("starting");

      setTranscript(
        `${await openai.audio.transcriptions.create({
          file: file,
          model: "whisper-1",
          response_format: "text",
        })}`
      );

      console.log("finished");
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };
  return (
    <main>
      <h1>Speech Analysis</h1>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <input type="submit" value="Upload" />
        <p>Transcript: {transcript}</p>
        <p>Suggestion: {response}</p>
      </form>
    </main>
  );
}

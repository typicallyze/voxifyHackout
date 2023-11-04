import { useState, useEffect } from "react";
import OpenAI from "openai";
import { Button } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Divider,
  Link,
} from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
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
              content: `This is a the transcript of my speech can you please tell me what mistakes I made and how I can improve them?"${transcript} " Also give me a score out 100 and be very strict`,
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
    <div className=" w-full h-screen bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-black to-gray-900">
      <h6 className=" text-white ">Speech Analysis</h6>
      <form onSubmit={onSubmit}>
        <input
          className="text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <input
          type="submit"
          value="Upload"
          className="text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        />
      </form>

      <div className="grid gap-8 items-start justify-center">
        <div className="relative">
          <div className=" absolute inset-0 bg-blue-600 rounded-lg blur"></div>
          <Card
            shadow="sm"
            className=" bg-zinc-950 hover:bg-zinc-900 text-white max-w-screen-md"
          >
            <CardHeader className="flex gap-3"> Transcript</CardHeader>
            <Divider />
            <CardBody>{transcript}</CardBody>
          </Card>
        </div>
      </div>

      <div className="grid gap-8 items-start justify-center">
        <div className="relative">
          <div className=" absolute inset-0 bg-green-500 rounded-lg blur"></div>
          <Card className="max-w-screen-md">
            <CardBody>Suggestion: {response}</CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

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

//This should be done via api routes for final production build

let a = 0;
const openai = new OpenAI({
  apiKey: "insert your API here",
  dangerouslyAllowBrowser: true,
});

export default function Home() {
  const [file, setFile] = useState<File>();
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (a > 0) {
      console.log("Transcript changed ?");
      const f = async function getResponse() {
        const chatCompletion = await openai.chat.completions.create({
          messages: [
            {
              role: "user",
              content: `You are a speech guide and will tell the user what mistakes they made in their speech and tell them how they can correct/improve them. You will also give them a score out of 100. Be VERY strict in giving the scores. The score must be in the end of your message like this "[Score: 47/100]". Here is the transcript "${transcript}"`,
            },
          ],
          model: "gpt-3.5-turbo-16k",
        });
        setResponse(`${chatCompletion.choices[0]?.message?.content}`);
      };
      f();
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
          prompt: "So uhm, yeaah, Okay, ehm, uuuh, umm, uhh, ahh, well, ah, uh",
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
    <div className=" flex flex-row  justify-center items-center w-full min-h-screen bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-black to-gray-700">
      <Card className=" bg-black ">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://media.discordapp.net/attachments/822736303387967528/1170587315010285568/Untitled.png?ex=65599564&is=65472064&hm=83ab29498138fde18f5e23c5f83ea8e42a9d369b7ef8c586133f836aca1e2d3a&="
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md text-white">Voxify</p>
          </div>
        </CardHeader>
        <Divider className="bg-white" />
        <CardBody>
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
                className="w-screen bg-zinc-950 hover:bg-zinc-900 text-white max-w-screen-md"
              >
                <CardHeader className="flex gap-3"> Transcript</CardHeader>
                <Divider className=" bg-slate-600" />
                <CardBody>{transcript}</CardBody>
              </Card>
            </div>
          </div>
          <div className="grid gap-8 items-start justify-center">
            <div className="relative">
              <div className=" absolute inset-0 bg-blue-600 rounded-lg blur"></div>
              <Card
                shadow="sm"
                className=" bg-zinc-950 hover:bg-zinc-900 text-white w-screen max-w-screen-md"
              >
                <CardHeader className="flex gap-3"> Analysis</CardHeader>
                <Divider className=" bg-slate-600" />
                <CardBody>{response}</CardBody>
              </Card>
            </div>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            href="https://github.com/typicallyze/hack23"
          >
            Visit source code on GitHub.
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

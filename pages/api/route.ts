import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai';
import {useState} from 'react';
 

var KEY = process.env.OPENAI_API_KEY



type ResponseData = {
  message: string
}
 
const openai = new OpenAI({
    apiKey: KEY,
    dangerouslyAllowBrowser: true 
  });

  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");

  
  const f = async function getResponse() {
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
  f();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}
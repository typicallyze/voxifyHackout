import { useState, useEffect } from 'react'
import OpenAI from "openai";



const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true
});


export default function Home() {
  const [file, setFile] = useState<File>()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    try {
      const data = new FormData();
      
      data.append('file', file);
      data.append("model","whisper-1");
      data.append("response_format","verbose_json");

      const res = await fetch("https://api.openai.com/v1/whisper", {
      method: "POST",
      body: data,
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      })
    .then((response)=> response.json())
    .catch((error)=> {console.error(error);});

      // handle the error
      if (!res.ok) throw new Error(await res.text())
    } catch (e: any) {
      // Handle errors here
      console.error(e)
    }

    
  }
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
      <p>ChatGPT</p>
    </form>
    </main>
  )
}

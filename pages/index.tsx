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
      console.log("starting")

      await console.log(await openai.audio.transcriptions.create({file: file,
        model: 'whisper-1',
        response_format: "text"  
      }))

      console.log("finished")


   
    } catch (e: any) {
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

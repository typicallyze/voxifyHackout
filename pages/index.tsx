import { useState, useEffect } from 'react'
import OpenAI from "openai";



const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true
});


export default function Home() {
  const [file, setFile] = useState<File>()
  const [transcript, setTranscript] = useState("")

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    try {

      console.log("starting")

      setTranscript(`${await openai.audio.transcriptions.create({file: file,
        model: 'whisper-1',
        response_format: "text"  
      })}`)

      console.log("finished")


   
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
      <p>ChatGPT: {transcript}</p>
    </form>
    </main>
  )
}

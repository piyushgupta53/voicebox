"use client";
import { useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import Link from "next/link";

import { useSession } from "next-auth/react";
import { characters } from "@/utils/constants";

export default function Home() {
  const [text, setText] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const [character, setCharacter] = useState("");
  const [status, setStatus] = useState("");

  const { data: session } = useSession();

  const userId = session?.user.id;

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleCharacterChange = (e) => {
    setCharacter(e.target.value);
  };

  const handleConvert = async () => {
    try {
      setStatus("loading");
      const response = await axios.post("/api/convert", {
        text,
        character,
        userId,
      });

      // const audioBase64 = response.data.audioBase64;
      // const audioBlob = new Blob(
      //   [new Uint8Array(Buffer.from(audioBase64, "base64"))],
      //   { type: "audio/mpeg" }
      // );

      // const audioUrl = URL.createObjectURL(audioBlob);

      setAudioSrc(response.data.audioUrl);
    } catch (error) {
      console.error("Error converting text to speech:", error);
    } finally {
      setStatus("completed");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="flex justify-center p-4 text-2xl bg-lime-200">
        <Link href="/" className="border-double border-4 border-indigo-400 p-2">
          VoiceBox
        </Link>
      </nav>
      <div className="flex flex-col justify-center items-center bg-lime-200 flex-grow">
        <p>👋 {session?.user.name}</p>
        <div className="w-1/2">
          <fieldset className="border border-black p-2">
            <legend className="ml-2">Choose character</legend>
            <div className="grid grid-cols-1 gap-2 mt-2 md:flex flex-wrap">
              {characters.map((char) => (
                <div key={char.value}>
                  <input
                    id={char.value}
                    type="radio"
                    value={char.value}
                    name="character"
                    checked={character === char.value}
                    onChange={handleCharacterChange}
                  />
                  <label htmlFor={char.value} className="ml-2">
                    {char.label}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
        <div className="flex w-1/2 flex-col mt-4">
          <textarea
            placeholder="Type your text here..."
            value={text}
            maxLength={500}
            onChange={handleTextChange}
            className="p-4 border border-gray-200 h-40 outline-indigo-400"
          />
          <div className="flex justify-end text-gray-500">
            {text.length}/500
          </div>
          <button
            onClick={handleConvert}
            disabled={status === "loading"}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-blue-300 p-2 rounded-full mt-4"
          >
            {status === "loading" ? "Generating..." : "Convert"}
          </button>
        </div>
        {audioSrc && (
          <div className="border border-dotted border-black w-1/2 max-w-full flex flex-col items-center flex-wrap mt-8 p-2">
            <audio controls src={audioSrc} className="w-full"></audio>
            <a
              href={audioSrc}
              download="speech.mp3"
              className="mt-8 underline decoration-wavy hover:text-blue-600 "
            >
              Download
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

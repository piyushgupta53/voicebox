import OpenAI from "openai";
import { NextResponse } from "next/server";
import { Buffer } from "buffer";

import AudioData from "@/models/AudioDataModel";

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export async function POST(request) {
  try {
    const requestBody = await request.json();
    const { text, character, userId } = requestBody;
    const response = await openai.audio.speech.create({
      model: "tts-1",
      voice: character,
      input: text,
    });

    // Collect chunks from the response stream
    const chunks = [];
    for await (const chunk of response.body) {
      chunks.push(chunk);
    }

    // Convert the chunks to a buffer
    const audioBuffer = Buffer.concat(chunks);
    const audioBase64 = audioBuffer.toString("base64");
    const audioUrl = `data:audio/mpeg;base64,${audioBase64}`; // remove later if doesn't work

    await AudioData.create({
      user: userId,
      text,
      character,
      audioURL: audioUrl,
    }); // remove this

    return NextResponse.json({ audioBase64, audioUrl }, { status: 200 }); // remove audioURL
  } catch (error) {
    console.error("Error in text-to-speech conversion:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Home() {
  const router = useRouter();

  const handleSignin = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };
  return (
    <div className="h-screen flex flex-col relative">
      <nav className="flex justify-center p-4 text-2xl">
        <Link href="/" className="border-double border-4 border-indigo-400 p-2">
          VoiceBox
        </Link>
      </nav>
      <div className="absolute top-40 bottom-20 left-8 right-8 h-96 w-full bg-gradient-radial from-green-300 to-indigo-500 opacity-40 blur-3xl z-0"></div>
      <main className="flex-grow flex justify-center mt-32 z-10">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-semibold">
            Turn your text to lifelike voices
          </h1>
          <p className="mt-8 text-sm md:text-lg text-gray-500">
            Generate human-like voices from your text using AI
          </p>
          <div className="mt-12">
            <button
              onClick={handleSignin}
              className="bg-gradient-to-br from-green-300 to-indigo-400 px-3 rounded-full p-2 hover:bg-gradient-to-bl"
            >
              Get Started
            </button>
          </div>
        </div>
      </main>
      <footer className="flex justify-center mb-8">
        by&nbsp;
        <a href="https://twitter.com/pleasepushh" className="text-indigo-500">
          @pleasepushh
        </a>
      </footer>
    </div>
  );
}

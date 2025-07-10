import { Geist, Geist_Mono } from "next/font/google";
import React from 'react';
import InputForm from "./ui/form";
import '../styles/globals.css';
import { handleSubmit } from "./api/submit";
import MarkdownDisplay from "./ui/markdown";
import WaveBackground from "./ui/background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [markdown, setMarkdown] = React.useState<string | null>(null);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <WaveBackground/>
      {!markdown ? (
      // Only the form, centered
      <div className="md:w-1/2 w-full flex justify-center items-start">
        <InputForm onSubmit={handleSubmit} />
      </div>
      ) : (
      // Two-column layout: form (left), markdown (right)
      <div className="flex flex-col md:flex-row w-full max-w-5xl gap-6">
        <div className="md:w-1/2 w-full flex justify-center items-start">
        <InputForm onSubmit={handleSubmit} />
        </div>
        <div className="md:w-1/2 w-full border border-gray-200 rounded-md bg-white shadow">
        <MarkdownDisplay content={markdown} />
        </div>
      </div>
      )}
    </main>
  );
}

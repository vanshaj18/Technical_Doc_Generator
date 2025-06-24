import { Geist, Geist_Mono } from "next/font/google";
import React from 'react';
import InputForm from "./ui/form";
import '../styles/globals.css';
import { handleSubmit } from "./api/submit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Technical Documentation Generator</h1>
      <InputForm onSubmit={handleSubmit} />
    </main>
  );
}

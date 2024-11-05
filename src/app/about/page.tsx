import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "About",
  description: "About",
};

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto p-6 mt-4 bg-white shadow-lg rounded-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Tech Stack</h1>
        <ul className="list-disc list-inside space-y-2">
          <li className="flex items-center">
            <span className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-2"></span>
            <p>Next.js</p>
          </li>
          <li className="flex items-center">
            <span className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-2"></span>
            <p>Tailwind CSS</p>
          </li>
          <li className="flex items-center">
            <span className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-2"></span>
            <p>Express</p>
          </li>
          <li className="flex items-center">
            <span className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-2"></span>
            <p>Drizzle</p>
          </li>
          <li className="flex items-center">
            <span className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-2"></span>
            <p>Tanstack Query</p>
          </li>
          <li className="flex items-center">
            <span className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-2"></span>
            <p>Genezio</p>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Contact Me</h2>
        <p className="mb-2">Hit me on Telegram:</p>
        <a
          href="https://t.me/spacexx1bot"
          className="text-blue-600 hover:underline"
        >
          https://t.me/spacexx1bot
        </a>
        <p className="mt-4 mb-2">Find me on GitHub:</p>
        <a
          href="https://github.com/haycalrh21"
          className="text-blue-600 hover:underline"
        >
          https://github.com/haycalrh21
        </a>
      </div>
    </div>
  );
}

"use client";

import { ShoppingAssistant } from '@/components/ShoppingAssistant';

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <header className="w-full p-4 text-center bg-blue-500 text-white">
        <h1 className="text-2xl font-bold">AI Shopping Assistant</h1>
        <p className="text-sm">Speak or type to get personalized shopping recommendations</p>
      </header>

      <div className="flex-grow w-full max-w-4xl p-4">
        <div className="h-[calc(100vh-8rem)] overflow-hidden border rounded-lg shadow-md">
          <ShoppingAssistant />
        </div>
      </div>

      <footer className="w-full p-4 text-center text-sm text-gray-500">
        <p>© 2025 Virtual Shopping Assistant. Try both text and voice interactions!</p>
      </footer>
    </main>
  );
}

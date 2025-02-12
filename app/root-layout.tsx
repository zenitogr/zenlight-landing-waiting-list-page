"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeContext } from "./theme-context";
import Link from 'next/link';

export function RootLayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`relative min-h-screen overflow-x-hidden theme-transition ${theme}`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="godray opacity-30"></div>
          <div className="godray opacity-30" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="fixed top-6 right-6 z-10">
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>

        <nav className="fixed top-6 left-6 z-10">
          <Link 
            href="/more-info" 
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
          >
            More Info
          </Link>
        </nav>

        <div className="relative flex items-center justify-center min-h-screen">
          <main className="flex flex-col items-center w-full max-w-4xl px-4">
            {children}
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

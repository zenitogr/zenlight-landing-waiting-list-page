"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import './styles/animations.css';
import './styles/theme.css';
import confetti from 'canvas-confetti';

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const createConfetti = () => {
    const duration = 3000;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(() => {
      const timeLeft = duration - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/waiting-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you for joining our waiting list!');
        setEmail('');
        createConfetti();
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to submit. Please try again.');
    }
  };

  return (
    <div className={`min-h-screen theme-transition ${theme}`}>
      <div className="godray"></div>
      <div className="godray" style={{ animationDelay: '4s' }}></div>
      
      <div className="fixed top-4 right-4">
        <button
          onClick={toggleTheme}
          className="cyberpunk-button px-4 py-2 rounded-lg"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col items-center row-start-2 gap-8 w-full max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="gradient-text text-4xl sm:text-6xl font-bold mb-4 animate-float">
              Join the Zenlight Revolution
            </h1>
            <p className="text-xl opacity-80">Experience the future of development</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-6 py-3 rounded-lg bg-opacity-20 backdrop-blur-sm border-2 border-opacity-50 focus:outline-none focus:ring-2 focus:ring-primary-dark dark:bg-black dark:bg-opacity-30"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="cyberpunk-button mt-4 w-full py-3 px-6 rounded-lg text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Joining...' : 'Join Waiting List'}
              </button>
            </div>
            {message && (
              <div className={`success-animation mt-4 p-4 rounded-lg text-center ${
                status === 'success' 
                  ? 'bg-green-500 bg-opacity-20 text-green-300' 
                  : 'bg-red-500 bg-opacity-20 text-red-300'
              }`}>
                {message}
              </div>
            )}
          </form>

          <div className="mt-8 text-center">
            <h2 className="gradient-text text-2xl font-bold mb-4">Skip the Waiting List</h2>
            <p className="mb-4">Support our development with a minimum €5 donation</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://ko-fi.com/zenlight"
                target="_blank"
                rel="noopener noreferrer"
                className="cyberpunk-button px-6 py-3 rounded-lg inline-flex items-center gap-2"
              >
                <span>☕ Support on Ko-fi</span>
              </a>
              <a
                href="https://revolut.me/zenlight"
                target="_blank"
                rel="noopener noreferrer"
                className="cyberpunk-button px-6 py-3 rounded-lg inline-flex items-center gap-2"
              >
                <span>💳 Donate via Revolut</span>
              </a>
            </div>
          </div>
        </main>

        <footer className="flex flex-wrap items-center justify-center row-start-3 gap-6 text-sm opacity-70">
          <p>© 2024 Zenlight. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

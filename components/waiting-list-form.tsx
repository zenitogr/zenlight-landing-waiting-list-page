"use client";

import { useState } from "react";
import confetti from 'canvas-confetti';

interface WaitingListFormProps {
  theme: 'light' | 'dark';
}

export function WaitingListForm({ theme }: WaitingListFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState("");

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
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 w-full max-w-md">
      <div className="w-full flex flex-col items-center gap-6">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="custom-input w-[320px] px-6 py-4 rounded-lg bg-opacity-20 border-2 border-opacity-50 focus:outline-none focus:ring-2 focus:ring-primary-dark text-lg"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="cyberpunk-button w-[320px] py-4 px-8 rounded-lg text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Joining...' : 'Join Waiting List'}
        </button>
      </div>
      {message && (
        <div className={`success-animation p-4 rounded-lg text-center ${
          status === 'success' 
            ? `bg-green-500 bg-opacity-20 ${theme === 'light' ? 'text-black' : 'text-white'}` 
            : 'bg-red-500 bg-opacity-20 text-red-300'
        }`}>
          {message}
        </div>
      )}
    </form>
  );
}

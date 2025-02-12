"use client";

import { useState } from "react";
import confetti from 'canvas-confetti';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';

interface WaitingListFormProps {
  theme: 'light' | 'dark';
}

export function WaitingListForm({ theme }: WaitingListFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<'idle' | 'validating' | 'submitting' | 'checking' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState("");

  const createConfetti = () => {
    const duration = 3000;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: NodeJS.Timeout = setInterval(() => {
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
    
    // Dismiss any existing toasts
    toast.dismiss();
    
    // Reset states
    setStatus('validating');
    setMessage("Validating your email...");
    const validateToast = toast.loading("Validating email format...");

    console.log('Submitting email:', email);

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      toast.error("Invalid email format", { id: validateToast });
      return;
    }

    // Update status to submitting
    setStatus('submitting');
    setMessage("Submitting your email to the waiting list...");
    const submitToast = toast.loading("Adding you to the waiting list...", { id: validateToast });
    
    try {
      console.log('Sending request to API...');
      const response = await fetch('/api/waiting-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log('API response:', data);

      // Update status to checking
      setStatus('checking');
      setMessage("Verifying your subscription...");
      toast.loading("Verifying your subscription...", { id: submitToast });

      if (response.ok) {
        setStatus('success');
        setMessage('🎉 Welcome aboard! You\'ve successfully joined the waiting list. We\'ll keep you updated on our progress!');
        setEmail('');
        createConfetti();
        toast.success("Successfully joined the waiting list!", { id: submitToast });
      } else {
        setStatus('error');
        const errorMessage = data.error || 'Something went wrong. Please try again.';
        setMessage(errorMessage);
        toast.error(errorMessage, { id: submitToast });
      }
    } catch (error: unknown) {
      console.error('Form submission error:', error);
      setStatus('error');
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit. Please try again.';
      setMessage(errorMessage);
      toast.error(errorMessage, { id: submitToast });
    }
  };

  const isLoading = ['validating', 'submitting', 'checking'].includes(status);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 w-full max-w-md">
      <div className="w-full flex flex-col items-center gap-6">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className={`custom-input w-[320px] px-6 py-4 rounded-lg bg-opacity-20 border-2 border-opacity-50 focus:outline-none focus:ring-2 focus:ring-primary-dark text-lg ${
            status === 'error' ? 'border-red-500' : ''
          }`}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="cyberpunk-button w-[320px] py-4 px-8 rounded-lg text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed relative"
        >
          <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
            Join Waiting List
          </span>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <ClipLoader size={24} color={theme === 'light' ? '#000000' : '#ffffff'} />
            </div>
          )}
        </button>
      </div>
      {message && (
        <div 
          className={`transition-all duration-300 p-4 rounded-lg text-center ${
            status === 'success' 
              ? `bg-green-500 bg-opacity-20 ${theme === 'light' ? 'text-black' : 'text-white'}` 
              : status === 'error'
              ? 'bg-red-500 bg-opacity-20 text-red-300'
              : `bg-blue-500 bg-opacity-20 ${theme === 'light' ? 'text-black' : 'text-white'}`
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
}
